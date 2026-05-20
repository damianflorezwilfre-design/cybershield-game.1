$url = "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.8.zip"
$output = "mongodb.zip"

Write-Host "Descargando MongoDB portátil..."
Invoke-WebRequest -Uri $url -OutFile $output

Write-Host "Extrayendo archivo ZIP (esto puede tomar un momento)..."
Expand-Archive -Path $output -DestinationPath "mongodb" -Force

if (-not (Test-Path "mongodb_data")) {
    New-Item -ItemType Directory -Force -Path "mongodb_data" | Out-Null
}

Write-Host "Iniciando servidor de base de datos..."
$mongodPath = "mongodb\mongodb-win32-x86_64-windows-7.0.8\bin\mongod.exe"
Start-Process -FilePath $mongodPath -ArgumentList "--dbpath mongodb_data" -WindowStyle Hidden

Write-Host "MongoDB iniciado con exito!"
