@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo 请先安装 Node.js 22 或更新版本，再启动游戏。
  pause
  exit /b 1
)
echo 启动后请在浏览器打开下方的本地地址。
node scripts/serve.mjs
pause
