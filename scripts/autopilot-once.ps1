$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$reportsDir = Join-Path $projectRoot "automation\reports"
$logsDir = Join-Path $projectRoot "automation\logs"
$runtimeDir = Join-Path $projectRoot "automation\runtime"
$backlogPath = Join-Path $projectRoot "automation\backlog.md"

New-Item -ItemType Directory -Force -Path $reportsDir | Out-Null
New-Item -ItemType Directory -Force -Path $logsDir | Out-Null
New-Item -ItemType Directory -Force -Path $runtimeDir | Out-Null

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$reportFile = Join-Path $reportsDir "autopilot-$timestamp.md"
$logFile = Join-Path $logsDir "autopilot-$timestamp.log"
$lockDir = Join-Path $runtimeDir "autopilot.lock"
$lockInfoPath = Join-Path $lockDir "owner.json"
$lockAcquired = $false

function Write-SkipReport {
  param(
    [string]$Reason
  )

  "# Autopilot Report $timestamp`n" | Out-File -FilePath $reportFile -Encoding utf8
  "## status`n`nSkipped: $Reason`n" | Out-File -FilePath $reportFile -Append -Encoding utf8
  $Reason | Out-File -FilePath $logFile -Encoding utf8
}

function Get-LockMetadata {
  if (-not (Test-Path $lockInfoPath)) {
    return $null
  }

  try {
    return Get-Content $lockInfoPath -Raw | ConvertFrom-Json
  } catch {
    return $null
  }
}

if (Test-Path $lockDir) {
  $lockMeta = Get-LockMetadata
  $activePid = $null

  if ($lockMeta -and $lockMeta.pid) {
    $activePid = Get-Process -Id ([int]$lockMeta.pid) -ErrorAction SilentlyContinue
  }

  if ($activePid) {
    Write-SkipReport -Reason "Another autopilot run is active (PID $($activePid.Id))."
    exit 0
  }

  Remove-Item -Recurse -Force $lockDir -ErrorAction SilentlyContinue
}

try {
  New-Item -ItemType Directory -Path $lockDir -ErrorAction Stop | Out-Null
  $lockAcquired = $true
  @{
    pid = $PID
    startedAt = (Get-Date).ToString("o")
    host = $env:COMPUTERNAME
  } | ConvertTo-Json | Out-File -FilePath $lockInfoPath -Encoding utf8
} catch {
  Write-SkipReport -Reason "Failed to acquire autopilot lock: $($_.Exception.Message)"
  exit 0
}

function Invoke-Step {
  param(
    [string]$Label,
    [string]$Command
  )

  "`n### $Label`n" | Out-File -FilePath $reportFile -Append -Encoding utf8
  "PS> $Command`n" | Out-File -FilePath $reportFile -Append -Encoding utf8

  $output = Invoke-Expression $Command 2>&1 | Out-String
  $output | Tee-Object -FilePath $logFile -Append | Out-Null
  "```text`n$output`n```n" | Out-File -FilePath $reportFile -Append -Encoding utf8
}

function Invoke-CodexPass {
  param(
    [string]$Prompt,
    [string]$OutputPath,
    [int]$TimeoutSeconds = 240
  )

  $promptFile = Join-Path $runtimeDir "codex-prompt-$timestamp.txt"
  $runnerFile = Join-Path $runtimeDir "codex-run-$timestamp.ps1"
  $stdoutFile = Join-Path $logsDir "codex-$timestamp.stdout.log"
  $stderrFile = Join-Path $logsDir "codex-$timestamp.stderr.log"

  $Prompt | Out-File -FilePath $promptFile -Encoding utf8

  @"
Set-Location '$projectRoot'
Get-Content -Raw '$promptFile' | codex --search -a never exec --skip-git-repo-check -C '$projectRoot' -s workspace-write -o '$OutputPath'
"@ | Out-File -FilePath $runnerFile -Encoding utf8

  $process = Start-Process powershell.exe `
    -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $runnerFile) `
    -PassThru `
    -RedirectStandardOutput $stdoutFile `
    -RedirectStandardError $stderrFile

  $finished = Wait-Process -Id $process.Id -Timeout $TimeoutSeconds -ErrorAction SilentlyContinue

  if (-not $finished) {
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    throw "Codex self-improvement timed out after $TimeoutSeconds seconds."
  }

  if ($process.ExitCode -ne 0) {
    $stderr = if (Test-Path $stderrFile) { Get-Content $stderrFile -Raw } else { "" }
    throw "Codex self-improvement failed with exit code $($process.ExitCode). $stderr"
  }

  Remove-Item $promptFile, $runnerFile -Force -ErrorAction SilentlyContinue
}

try {
  Set-Location $projectRoot
  "# Autopilot Report $timestamp`n" | Out-File -FilePath $reportFile -Encoding utf8

  if (-not (Test-Path (Join-Path $projectRoot "node_modules"))) {
    Invoke-Step -Label "npm install" -Command "npm install"
  }

  $runtimeInstallOk = $true
  $puaInstallOk = $true
  $buildOk = $true
  $testOk = $true

  try {
    Invoke-Step -Label "install runtime skills" -Command "npm run install:all"
  } catch {
    $runtimeInstallOk = $false
  }

  try {
    Invoke-Step -Label "install pua skills" -Command "npm run install:pua:all"
  } catch {
    $puaInstallOk = $false
  }

  try {
    Invoke-Step -Label "build" -Command "npm run build"
  } catch {
    $buildOk = $false
  }

  try {
    Invoke-Step -Label "test" -Command "npm run test"
  } catch {
    $testOk = $false
  }

  $codex = Get-Command codex -ErrorAction SilentlyContinue
  $canImprove = $codex -and $runtimeInstallOk -and $puaInstallOk -and $buildOk -and $testOk -and (Test-Path $backlogPath)

  if ($canImprove) {
    $lastMessage = Join-Path $reportsDir "codex-last-$timestamp.txt"
    $prompt = @"
You are the RuMa Runtime autopilot.

Work ONLY inside this workspace. Read skills/pua/SKILL.md and use it as the pressure-and-verification protocol. Then read automation/backlog.md and choose the single highest-value pending item that can be completed safely in one pass.

Rules:
1. Make one bounded improvement only.
2. Run npm run build and npm run test after the change.
3. Update automation/backlog.md to reflect the result.
4. Write a concise report to automation/reports/codex-$timestamp.md with what changed, what passed, and what remains.
5. If nothing should be changed, write the report explaining why and stop.
"@

    try {
      Invoke-CodexPass -Prompt $prompt -OutputPath $lastMessage
      "## codex exec`n`nRan one self-improvement pass.`n" | Out-File -FilePath $reportFile -Append -Encoding utf8
    } catch {
      "## codex exec`n`nSkipped or failed: $($_.Exception.Message)`n" | Out-File -FilePath $reportFile -Append -Encoding utf8
    }
  } else {
    "## codex exec`n`nSkipped. runtimeInstallOk=$runtimeInstallOk puaInstallOk=$puaInstallOk buildOk=$buildOk testOk=$testOk codexPresent=$([bool]$codex)`n" | Out-File -FilePath $reportFile -Append -Encoding utf8
  }
} finally {
  if ($lockAcquired -and (Test-Path $lockDir)) {
    Remove-Item -Recurse -Force $lockDir -ErrorAction SilentlyContinue
  }
}
