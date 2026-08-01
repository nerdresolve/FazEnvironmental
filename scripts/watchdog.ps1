# Watchdog for the FAZ backend (serves API + prerendered frontend on one process).
# Keeps `node dist/server.js` alive: restarts it if it exits or crashes.
# Usage: powershell -ExecutionPolicy Bypass -File scripts\watchdog.ps1

$ErrorActionPreference = "Stop"

$backendDir = Join-Path $PSScriptRoot "..\apps\backend"
$logDir = Join-Path $PSScriptRoot "..\logs"
$logFile = Join-Path $logDir "watchdog.log"

New-Item -ItemType Directory -Force -Path $logDir | Out-Null

function Write-Log($message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$timestamp] $message"
    Write-Host $line
    Add-Content -Path $logFile -Value $line
}

$env:NODE_ENV = "production"
if (-not $env:PORT) { $env:PORT = "3001" }

Write-Log "Watchdog started. Backend dir: $backendDir, PORT=$($env:PORT)"

$restartCount = 0

while ($true) {
    $restartCount++
    Write-Log "Starting backend (attempt #$restartCount)..."

    $proc = Start-Process -FilePath "node" -ArgumentList "dist/server.js" `
        -WorkingDirectory $backendDir `
        -NoNewWindow -PassThru `
        -RedirectStandardOutput (Join-Path $logDir "backend-out.log") `
        -RedirectStandardError (Join-Path $logDir "backend-err.log")

    Write-Log "Backend running with PID $($proc.Id)."
    $proc.WaitForExit()

    Write-Log "Backend exited with code $($proc.ExitCode). Restarting in 3s..."
    Start-Sleep -Seconds 3
}
