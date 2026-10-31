// Draw a continuous WHITE MASK, leaving the original dashed stroke unchanged.
// Supports stroke-only SVG geometry without pre-existing masks/markers.
// Filled/outlined artwork remains intact and uses the connector fade fallback.

const NS = 'http://www.w3.org/2000/svg';
let nextMask = 0;

export function prepareDrawing(svg: SVGSVGElement) {
  const defs = document.createElementNS(NS, 'defs');
  const strokes: SVGGeometryElement[] = [];
  const restore: Array<() => void> = [];
  const candidates = Array.from(
    svg.querySelectorAll<SVGGeometryElement>(
      'path, line, polyline, polygon, rect, circle, ellipse',
    ),
  );

  for (const source of candidates) {
    if (source.closest('defs, mask, clipPath, symbol')) continue;
    const css = getComputedStyle(source);
    if (
      css.stroke === 'none' ||
      css.fill !== 'none' ||
      css.maskImage !== 'none' ||
      source.hasAttribute('mask') ||
      [css.markerStart, css.markerMid, css.markerEnd].some((value) => value !== 'none')
    )
      continue;

    const strokeWidth = Number.parseFloat(css.strokeWidth);
    if (!Number.isFinite(strokeWidth) || strokeWidth <= 0) continue;

    const box = source.getBBox();
    const padding = strokeWidth * 2 + 2;
    const mask = document.createElementNS(NS, 'mask');
    const id = `hero-draw-${++nextMask}`;
    mask.id = id;
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    mask.setAttribute('maskContentUnits', 'userSpaceOnUse');
    mask.setAttribute('x', String(box.x - padding));
    mask.setAttribute('y', String(box.y - padding));
    mask.setAttribute('width', String(box.width + padding * 2));
    mask.setAttribute('height', String(box.height + padding * 2));

    const stroke = source.cloneNode(false) as SVGGeometryElement;
    for (const name of ['id', 'class', 'style', 'transform', 'filter', 'clip-path', 'mask']) {
      stroke.removeAttribute(name);
    }
    stroke.style.fill = 'none';
    stroke.style.stroke = 'white';
    stroke.style.strokeWidth = String(strokeWidth + 2);
    stroke.style.strokeLinecap = 'round';
    stroke.style.strokeLinejoin = 'round';
    stroke.style.opacity = '1';
    stroke.style.visibility = 'visible';
    stroke.setAttribute('stroke-dasharray', 'none');
    stroke.setAttribute('stroke-dashoffset', '0');

    mask.append(stroke);
    defs.append(mask);
    source.setAttribute('mask', `url(#${id})`);
    strokes.push(stroke);
    restore.push(() => source.removeAttribute('mask'));
  }

  if (strokes.length) svg.prepend(defs);

  let restored = false;
  return {
    strokes,
    restore() {
      if (restored) return;
      restored = true;
      for (const reset of restore) reset();
      defs.remove();
    },
  };
}
