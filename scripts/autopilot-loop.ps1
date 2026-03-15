param(
  [int]$IntervalSeconds = 300
)

$ErrorActionPreference = "Continue"

while ($true) {
  powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "autopilot-once.ps1")
  Start-Sleep -Seconds $IntervalSeconds
}
