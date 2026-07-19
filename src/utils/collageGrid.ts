export interface GridSize {
  rows: number;
  cols: number;
}

// Picks the rows x cols combination that wastes the fewest empty cells,
// tie-broken by how close the grid's aspect ratio is to the canvas aspect ratio.
export function computeGrid(
  count: number,
  canvasWidth: number,
  canvasHeight: number,
): GridSize {
  const canvasAspect = canvasWidth / canvasHeight;
  let best: GridSize = { rows: 1, cols: count };
  let bestScore = Infinity;

  for (let rows = 1; rows <= count; rows++) {
    const cols = Math.ceil(count / rows);
    const leftover = rows * cols - count;
    const gridAspect = cols / rows;
    const score = leftover * 10 + Math.abs(gridAspect - canvasAspect);
    if (score < bestScore) {
      bestScore = score;
      best = { rows, cols };
    }
  }

  return best;
}

// Draws an image into a target cell using "cover" behavior (like CSS object-fit: cover),
// cropping to fill the cell completely without distortion.
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const imgAspect = img.width / img.height;
  const cellAspect = w / h;

  let sx = 0,
    sy = 0,
    sw = img.width,
    sh = img.height;

  if (imgAspect > cellAspect) {
    sw = img.height * cellAspect;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / cellAspect;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export interface PhotoTransform {
  zoom: number; // 1 = fills the cell (cover), higher = zoomed in
  offsetX: number; // -1..1, pan as a fraction of cell width
  offsetY: number; // -1..1, pan as a fraction of cell height
  rotation: number; // degrees
}

export function defaultTransform(): PhotoTransform {
  return { zoom: 1, offsetX: 0, offsetY: 0, rotation: 0 };
}

// Draws an image into a cell applying zoom/pan/rotate, clipped so nothing
// spills into neighboring cells.
export function drawImageWithTransform(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cellX: number,
  cellY: number,
  cellW: number,
  cellH: number,
  transform: PhotoTransform,
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(cellX, cellY, cellW, cellH);
  ctx.clip();

  const baseScale = Math.max(cellW / img.width, cellH / img.height);
  const scale = baseScale * transform.zoom;
  const drawW = img.width * scale;
  const drawH = img.height * scale;

  const centerX = cellX + cellW / 2 + transform.offsetX * cellW;
  const centerY = cellY + cellH / 2 + transform.offsetY * cellH;

  ctx.translate(centerX, centerY);
  ctx.rotate((transform.rotation * Math.PI) / 180);
  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

  ctx.restore();
}
