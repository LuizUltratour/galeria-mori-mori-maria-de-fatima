# Galeria de Vídeos — MAAM (R Yazbek)

Galeria de vídeos com barra de miniaturas, para injeção via script no 3DVista.

- **GitHub:** https://github.com/LuizUltratour/galeria-ryazbek-maam.git
- **S3:** `s3://skylineip/Tour Virtual/R Yazbek/galeria-maam/`
- **URL:** https://skylineip.s3.sa-east-1.amazonaws.com/Tour+Virtual/R+Yazbek/galeria-maam/index.html

## Estrutura

```
index.html        galeria (lista de vídeos no array VIDEOS)
inject.js         loader para o 3DVista: AbrirGaleriaVideos(1) abre / (0) fecha
deploy.ps1        deploy para o S3
assets/videos/    .mp4
assets/thumbs/    miniaturas .jpg (16:9)
```

O primeiro vídeo inicia automaticamente e já aparece selecionado (borda dourada).
Se o navegador bloquear autoplay com som, inicia mudo.

Para adicionar um vídeo: coloque o `.mp4` e a miniatura e inclua uma linha no array `VIDEOS` do `index.html`.
