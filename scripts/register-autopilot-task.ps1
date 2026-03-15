$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$taskName = "RuMaRuntimeAutopilot"
$taskCommand = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$projectRoot\scripts\autopilot-once.ps1`""

schtasks /Create /SC MINUTE /MO 5 /TN $taskName /TR $taskCommand /F | Out-Null
Write-Host "Registered scheduled task: $taskName"
