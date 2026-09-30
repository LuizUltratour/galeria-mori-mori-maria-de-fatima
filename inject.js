(function (w, d) {
  'use strict';

  var GALLERY_URL = 'https://skylineip.s3.sa-east-1.amazonaws.com/Tour+Virtual/R+Yazbek/galeria-maam/index.html';

  var overlay    = null;
  var msgHandler = null;

  function _injectStyles() {
    if (d.getElementById('_gc_styles')) return;
    var s = d.createElement('style');
    s.id = '_gc_styles';
    s.textContent =
      '@keyframes _gcIn{from{opacity:0}to{opacity:1}}' +
      '@keyframes _gcOut{to{opacity:0}}';
    d.head.appendChild(s);
  }

  function _open() {
    if (overlay) _close();
    _injectStyles();

    overlay = d.createElement('div');
    overlay.id = '_gc_overlay';
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:2147483646;will-change:opacity;' +
      'animation:_gcIn 0.3s ease both;';

    var iframe = d.createElement('iframe');
    iframe.src = GALLERY_URL + '?v=' + Date.now();
    iframe.style.cssText = 'width:100%;height:100%;border:none;display:block;background:#1c1c1a;';
    iframe.setAttribute('allow', 'fullscreen; autoplay');

    overlay.appendChild(iframe);
    d.body.appendChild(overlay);

    msgHandler = function (e) {
      if (e.data && e.data.action === 'closeGallery') _close();
    };
    w.addEventListener('message', msgHandler);
  }

  function _close() {
    if (!overlay) return;
    var ref = overlay;
    overlay = null;

    ref.style.pointerEvents = 'none';
    ref.style.animation = '_gcOut 0.2s ease forwards';

    // Descarrega o iframe já, para o vídeo parar de tocar/baixar.
    var iframe = ref.querySelector('iframe');
    if (iframe) iframe.src = 'about:blank';

    var removed = false;
    function remove() {
      if (removed) return;
      removed = true;
      if (ref.parentNode) ref.parentNode.removeChild(ref);
    }
    ref.addEventListener('animationend', remove, { once: true });
    setTimeout(remove, 260);

    if (msgHandler) {
      w.removeEventListener('message', msgHandler);
      msgHandler = null;
    }
  }

  // AbrirGaleriaVideos(1) abre a galeria de vídeos · AbrirGaleriaVideos(0) fecha
  w.AbrirGaleriaVideos = function (show) {
    if (show === 1) _open(); else _close();
  };

}(window, document));
