<#
  deploy.ps1 - Deploy da galeria de videos MAAM para o AWS S3.

  Uso:
    ./deploy.ps1             # sync completo (html, js, videos, thumbs)
    ./deploy.ps1 -QuickHtml  # atualiza so index.html e inject.js (rapido)

  Pre-requisitos: AWS CLI instalado e credenciais configuradas (aws configure).
#>

param([switch]$QuickHtml)

$ErrorActionPreference = 'Stop'
$Bucket  = 's3://skylineip/Tour Virtual/R Yazbek/galeria-maam'
$NoCache = 'no-cache,no-store,must-revalidate'

Set-Location -Path $PSScriptRoot

if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
  Write-Host 'ERRO: AWS CLI nao encontrado no PATH.' -ForegroundColor Red
  exit 1
}

function Copy-Html($file) {
  Write-Host "  -> $file" -ForegroundColor Cyan
  aws s3 cp $file "$Bucket/$file" --cache-control $NoCache
}

if (-not $QuickHtml) {
  Write-Host 'Sync completo para o S3...' -ForegroundColor Green
  aws s3 sync . "$Bucket/" `
    --exclude ".git/*" --exclude ".claude/*" --exclude ".gitignore" --exclude ".gitattributes" `
    --exclude "*.ps1" --exclude "*.md" --exclude "Thumbs.db" --exclude "*/Thumbs.db" `
    --delete
}

Write-Host 'Aplicando cache-control no HTML/JS...' -ForegroundColor Green
Copy-Html 'index.html'
Copy-Html 'inject.js'

Write-Host 'Deploy concluido.' -ForegroundColor Green
Write-Host 'Base: https://skylineip.s3.sa-east-1.amazonaws.com/Tour+Virtual/R+Yazbek/galeria-maam/' -ForegroundColor DarkGray
