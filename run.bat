@echo off
echo ========================================================
echo        CyberShield Academy - Instalador y Ejecutor
echo ========================================================

echo Instalando dependencias del Backend...
cd backend
call npm install

echo.
echo Instalando dependencias del Frontend...
cd ../frontend
call npm install

echo.
echo ========================================================
echo Iniciando servidores...
echo ========================================================

start cmd /k "title CyberShield Backend && cd ../backend && npm run dev"
start cmd /k "title CyberShield Frontend && npm run dev"

echo.
echo Los servidores se estan ejecutando en ventanas separadas.
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:3000
echo.
pause
