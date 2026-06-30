// ============================================================
// EMUNÁ · Arrastar para rolar (carrossel horizontal)
// ============================================================
// Em touch, a rolagem horizontal já funciona nativamente. Este
// módulo adiciona o mesmo comportamento para quem usa mouse
// (clicar e arrastar), comum em carrosséis de e-commerce.
// ============================================================

export function initDragScroll(el) {
  if (!el) return;

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let moved = false;

  el.classList.add("drag-scroll");

  el.addEventListener("mousedown", (e) => {
    isDown = true;
    moved = false;
    el.classList.add("is-dragging");
    startX = e.pageX;
    scrollStart = el.scrollLeft;
  });

  ["mouseleave", "mouseup"].forEach((evt) =>
    el.addEventListener(evt, () => {
      isDown = false;
      el.classList.remove("is-dragging");
    })
  );

  el.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const delta = e.pageX - startX;
    if (Math.abs(delta) > 4) moved = true;
    el.scrollLeft = scrollStart - delta;
  });

  // evita que o clique (ex: abrir o produto) dispare logo após arrastar
  el.addEventListener(
    "click",
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );
}
