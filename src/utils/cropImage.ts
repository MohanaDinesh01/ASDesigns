export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Draws the user-selected crop region onto a canvas at the exact target
// pixel size (e.g. 5700x7800), regardless of the crop's native size.
export async function getCroppedCanvas(
  imageSrc: string,
  cropPixels: PixelCrop,
  targetWidth: number,
  targetHeight: number,
): Promise<HTMLCanvasElement> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    targetWidth,
    targetHeight,
  );

  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas to Blob conversion failed"));
    }, "image/png");
  });
}

// Splits a full-size canvas into top and bottom halves.
export function splitCanvasVertically(source: HTMLCanvasElement): {
  top: HTMLCanvasElement;
  bottom: HTMLCanvasElement;
} {
  const halfHeight = source.height / 2;

  const top = document.createElement("canvas");
  top.width = source.width;
  top.height = halfHeight;
  top
    .getContext("2d")!
    .drawImage(
      source,
      0,
      0,
      source.width,
      halfHeight,
      0,
      0,
      source.width,
      halfHeight,
    );

  const bottom = document.createElement("canvas");
  bottom.width = source.width;
  bottom.height = halfHeight;
  bottom
    .getContext("2d")!
    .drawImage(
      source,
      0,
      halfHeight,
      source.width,
      halfHeight,
      0,
      0,
      source.width,
      halfHeight,
    );

  return { top, bottom };
}
