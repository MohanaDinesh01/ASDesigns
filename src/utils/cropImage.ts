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

function getRadianAngle(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function rotatedBoundingBox(width: number, height: number, rotation: number) {
  const rad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rad) * width) + Math.abs(Math.sin(rad) * height),
    height: Math.abs(Math.sin(rad) * width) + Math.abs(Math.cos(rad) * height),
  };
}

// Rotation-aware crop: rotates the full image first onto a bounding-box canvas,
// then crops the requested pixel region from that rotated canvas, then resizes
// the result to the exact target pixel dimensions.
export async function getCroppedCanvas(
  imageSrc: string,
  cropPixels: PixelCrop,
  targetWidth: number,
  targetHeight: number,
  rotation = 0,
): Promise<HTMLCanvasElement> {
  const image = await loadImage(imageSrc);

  const { width: bboxW, height: bboxH } = rotatedBoundingBox(
    image.width,
    image.height,
    rotation,
  );
  const rotatedCanvas = document.createElement("canvas");
  rotatedCanvas.width = bboxW;
  rotatedCanvas.height = bboxH;
  const rotatedCtx = rotatedCanvas.getContext("2d")!;

  rotatedCtx.translate(bboxW / 2, bboxH / 2);
  rotatedCtx.rotate(getRadianAngle(rotation));
  rotatedCtx.translate(-image.width / 2, -image.height / 2);
  rotatedCtx.drawImage(image, 0, 0);

  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = targetWidth;
  finalCanvas.height = targetHeight;
  const finalCtx = finalCanvas.getContext("2d")!;

  finalCtx.drawImage(
    rotatedCanvas,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    targetWidth,
    targetHeight,
  );

  return finalCanvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas to Blob conversion failed"));
    }, "image/png");
  });
}

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
