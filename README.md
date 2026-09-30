# Galeria de Vídeos — MAAM (R Yazbek)

Galeria de vídeos com barra de miniaturas, para injeção via script no 3DVista, hospedada no AWS S3.

**Empreendimento:** MAAM — R Yazbek
**GitHub:** https://github.com/LuizUltratour/galeria-ryazbek-maam.git

---

## URLs de produção

| Arquivo | URL |
|---------|-----|
| Galeria | `https://skylineip.s3.sa-east-1.amazonaws.com/Tour+Virtual/R+Yazbek/galeria-maam/index.html` |
| Script  | `https://skylineip.s3.sa-east-1.amazonaws.com/Tour+Virtual/R+Yazbek/galeria-maam/inject.js` |

**S3 path:** `s3://skylineip/Tour Virtual/R Yazbek/galeria-maam/`

---

## Estrutura de arquivos

```
galeria-ryazbek-maam/
├── index.html          ← galeria de vídeos (lista no array VIDEOS)
├── inject.js           ← loader leve para injeção no 3DVista
├── deploy.ps1          ← deploy para o S3 (Windows)
└── assets/
    ├── close-*.png     ← botão de fechar
    ├── videos/         ← .mp4
    └── thumbs/         ← miniaturas .jpg (16:9)
```

> **Nomes em minúsculas, sem espaços e sem acento** (o S3 é case-sensitive).

---

## Comportamento

- O **primeiro vídeo inicia automaticamente** e já aparece selecionado (borda dourada).
- A **barra de miniaturas** fica embaixo; ao clicar numa miniatura o vídeo troca, toca e ela
  ganha a borda de "pressed".
- Se o navegador bloquear o autoplay com som, o vídeo inicia **mudo**.

### Adicionar / trocar vídeos

1. Coloque o `.mp4` em `assets/videos/`.
2. Gere a miniatura (ex.: frame em 2 s, 16:9):
   ```
   ffmpeg -ss 2 -i assets/videos/NOME.mp4 -frames:v 1 -vf scale=480:-2 -q:v 4 assets/thumbs/NOME.jpg
   ```
3. Inclua uma linha no array `VIDEOS` do `index.html`.

---

## Deploy AWS S3

> **Windows:** use o script pronto `./deploy.ps1`. Requer **AWS CLI** + `aws configure` (região `sa-east-1`).

```powershell
./deploy.ps1              # sync completo (html, js, vídeos, thumbs) + cache-control no HTML/JS
./deploy.ps1 -QuickHtml   # atualiza só index.html e inject.js (rápido)
```

> **`--cache-control "no-cache,no-store,must-revalidate"`** no HTML/JS — garante que o
> 3DVista nunca sirva uma versão cacheada da galeria ou do script.

---

## Integração 3DVista

### Passo 1 — Loader (JavaScript global do projeto)

```js
(function(){
  var s = document.createElement('script');
  s.src = 'https://skylineip.s3.sa-east-1.amazonaws.com/Tour+Virtual/R+Yazbek/galeria-maam/inject.js?v=' + Date.now();
  document.head.appendChild(s);
})();
```

> **`?v=` + `Date.now()`** — cache-busting: força o browser a baixar sempre a versão mais
> recente do script, evitando que o 3DVista sirva uma versão antiga em cache.

### Passo 2 — Acionar nos hotspots/botões

```js
AbrirGaleriaVideos(1);  // abre a galeria de vídeos · AbrirGaleriaVideos(0) fecha
```

> O iframe é criado com `allow="fullscreen; autoplay"` para permitir o autoplay do primeiro vídeo.

---

## Cores e tipografia

| Token CSS | Valor | Papel |
|-----------|-------|-------|
| `--bg` | `#1c1c1a` | Quase-preto — fundo / palco do vídeo |
| `--bar-bg` | `#141413` | Fundo da barra de miniaturas |
| `--dark` | `#F5F1EA` | Texto — quase-branco |
| `--gold` | `#EDD09E` | Dourado — borda do vídeo selecionado |
| Fonte títulos | Cormorant Garamond | — |
| Fonte UI | Inter | — |
