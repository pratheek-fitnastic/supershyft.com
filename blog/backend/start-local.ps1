# Start local blog backend (Docker MySQL + PHP dev server)
$ErrorActionPreference = "Stop"
$php = "C:\tools\php85\php.exe"
$root = Split-Path -Parent $PSScriptRoot
$backend = $PSScriptRoot

Write-Host "Starting MySQL (Docker)..." -ForegroundColor Cyan
Push-Location $backend
docker compose up -d
Pop-Location

Write-Host "Waiting for MySQL..." -ForegroundColor Cyan
Start-Sleep -Seconds 8

Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue |
    ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
Get-Process php -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "Starting PHP on http://localhost:8000 ..." -ForegroundColor Cyan
Write-Host "  Blog:  http://localhost:8000/blog/" -ForegroundColor Green
Write-Host "  Admin: http://localhost:8000/blog/backend/admin/login.php" -ForegroundColor Green
Write-Host "  Setup: http://localhost:8000/blog/backend/setup/seed.php" -ForegroundColor Yellow
Write-Host "  Login: admin@supershyft.com / admin123" -ForegroundColor Yellow

Set-Location $backend
& $php -S localhost:8000 -t $root
