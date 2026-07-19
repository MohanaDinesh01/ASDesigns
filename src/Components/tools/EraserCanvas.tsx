import { useRef, useEffect, useState } from "react";
import "./EraserCanvas.css";

interface EraserCanvasProps {
  originalImageUrl: string;
  noBgImageUrl: string;
  width: number;
  height: number;
  onDone: (canvas: HTMLCanvasElement) => void;
}

type Tool = "erase" | "restore";

export default function EraserCanvas({
  originalImageUrl,
  noBgImageUrl,
  width,
  height,
  onDone,
}: EraserCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImgRef = useRef<HTMLImageElement | null>(null);
  const isDrawing = useRef(false);
  const [tool, setTool] = useState<Tool>("erase");
  const [brushSize, setBrushSize] = useState(60);
  const [ready, setReady] = useState(false);

  // Display canvas at a manageable preview size, but keep full-res data internally
  const displayScale = Math.min(1, 900 / width);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;
    const noBgImg = new Image();
    const originalImg = new Image();

    let loaded = 0;
    const checkReady = () => {
      loaded++;
      if (loaded === 2) {
        ctx.drawImage(noBgImg, 0, 0, width, height);
        originalImgRef.current = originalImg;
        setReady(true);
      }
    };

    noBgImg.onload = checkReady;
    originalImg.onload = checkReady;
    noBgImg.src = noBgImageUrl;
    originalImg.src = originalImageUrl;
  }, [originalImageUrl, noBgImageUrl, width, height]);

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const paintAt = (x: number, y: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const realBrush = brushSize / displayScale;

    if (tool === "erase") {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, realBrush / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else {
      // restore: draw the original image clipped to a circle at this position
      const original = originalImgRef.current;
      if (!original) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, realBrush / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(original, 0, 0, width, height);
      ctx.restore();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDrawing.current = true;
    const { x, y } = getCanvasCoords(e);
    paintAt(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const { x, y } = getCanvasCoords(e);
    paintAt(x, y);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  const handleFinish = () => {
    if (canvasRef.current) onDone(canvasRef.current);
  };

  return (
    <div className="eraser-tool">
      <div className="eraser-tool__toolbar">
        <div className="eraser-tool__tool-group">
          <button
            className={`btn ${tool === "erase" ? "btn--primary" : "btn--ghost"}`}
            onClick={() => setTool("erase")}
          >
            Erase
          </button>
          <button
            className={`btn ${tool === "restore" ? "btn--primary" : "btn--ghost"}`}
            onClick={() => setTool("restore")}
          >
            Restore
          </button>
        </div>
        <label className="eraser-tool__brush-size">
          Brush size
          <input
            type="range"
            min={10}
            max={150}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
        </label>
      </div>

      <p className="eraser-tool__hint">
        {tool === "erase"
          ? "Brush over leftover background to remove it."
          : "Brush over any part of the subject that was accidentally erased to bring it back."}
      </p>

      <div
        className="eraser-tool__canvas-wrap"
        style={{ width: width * displayScale, height: height * displayScale }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>

      <button
        className="btn btn--primary"
        onClick={handleFinish}
        disabled={!ready}
      >
        Done touching up
      </button>
    </div>
  );
}
