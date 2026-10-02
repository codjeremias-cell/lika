/* De vez em quando uma flor ou uma toalha atravessa a página. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var palco = document.createElement("div");
  palco.className = "voos";
  palco.setAttribute("aria-hidden", "true");
  document.body.appendChild(palco);

  var flores = ["#E56A9A", "#F7F4EF", "#C9A6DE", "#E23B4A", "#F2B4CF"];
  var toalhas = ["#F7F3EE", "#9E2B33", "#B6A0C9", "#E48BB0", "#5E86C4", "#6B8F62"];

  function svgFlor(cor) {
    return (
      '<svg viewBox="0 0 64 64" aria-hidden="true">' +
      '<g fill="' + cor + '">' +
      '<circle cx="32" cy="14" r="10"/>' +
      '<circle cx="32" cy="50" r="10"/>' +
      '<circle cx="14" cy="32" r="10"/>' +
      '<circle cx="50" cy="32" r="10"/>' +
      '<circle cx="19" cy="19" r="9"/>' +
      '<circle cx="45" cy="19" r="9"/>' +
      '<circle cx="19" cy="45" r="9"/>' +
      '<circle cx="45" cy="45" r="9"/>' +
      "</g>" +
      '<circle cx="32" cy="32" r="7" fill="#F4D36A"/>' +
      "</svg>"
    );
  }

  function svgToalha(cor) {
    return (
      '<svg viewBox="0 0 128 76" aria-hidden="true">' +
      '<path fill="' + cor + '" d="M4 14c16-8 26 12 42 6 14-5 20-14 38-8 16 5 28-2 40 4l-8 46c-18-10-28 10-46 3-16-6-24 12-42 5L4 14z"/>' +
      '<path fill="rgba(255,255,255,.38)" d="M22 20c12 10 16 22 8 40" stroke="rgba(255,255,255,.38)" stroke-width="3" fill-opacity="0"/>' +
      '<path fill="rgba(0,0,0,.12)" d="M18 52c14 6 22-4 36 2 12 5 20-6 34-1l-2 10c-16-6-24 8-40 2-14-5-22 8-32 3z"/>' +
      "</svg>"
    );
  }

  function escolher(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  function soltar(tipo) {
    var el = document.createElement("div");
    var indoParaEsquerda = Math.random() < 0.5;
    var duracao = (7.5 + Math.random() * 4.5).toFixed(2);
    el.className = "voo" + (tipo === "toalha" ? " voo--toalha" : "");
    var porCima = Math.random() < 0.7;
    el.style.top = (porCima ? 14 + Math.random() * 18 : 72 + Math.random() * 16) + "vh";
    el.style.animation = (indoParaEsquerda ? "voar-esq " : "voar-dir ") + duracao + "s linear forwards";
    el.innerHTML = tipo === "flor" ? svgFlor(escolher(flores)) : svgToalha(escolher(toalhas));
    palco.appendChild(el);
    el.addEventListener("animationend", function () { el.remove(); });
  }

  function daqui(ms, fn) {
    window.setTimeout(fn, ms);
  }

  function ciclo() {
    soltar(Math.random() < 0.55 ? "flor" : "toalha");
    daqui(12000 + Math.random() * 14000, ciclo);
  }

  daqui(3500, function () { soltar("flor"); });
  daqui(9000, function () { soltar("toalha"); });
  daqui(18000, ciclo);
})();
