import { useRef, useState } from "react";
import {
  computeGrid,
  drawImageWithTransform,
  loadImage,
  defaultTransform,
  type GridSize,
  type PhotoTransform,
} from "../../utils/collageGrid";
import "./CollageA3Tool.css";

const CANVAS_WIDTH = 19 * 300; // 5700px
const CANVAS_HEIGHT = 13 * 300; // 3900px
const MM_TO_PX = 300 / 25.4;

type Stage = "setup" | "upload" | "arrange" | "generating" | "done";

export default function CollageA3Tool() {
  const [stage, setStage] = useState<Stage>("setup");
  const [count, setCount] = useState(6);
  const [gapMm, setGapMm] = useState(5);
  const [grid, setGrid] = useState<GridSize>({ rows: 2, cols: 3 });
  const [gridOverride, setGridOverride] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [transforms, setTransforms] = useState<PhotoTransform[]>([]);
  const [swapMode, setSwapMode] = useState(false);
  const [swapIndex, setSwapIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const dragState = useRef<{
    startX: number;
    startY: number;
    origOffsetX: number;
    origOffsetY: number;
  } | null>(null);

  const handleCountChange = (value: number) => {
    setCount(value);
    if (!gridOverride) {
      setGrid(computeGrid(value, CANVAS_WIDTH, CANVAS_HEIGHT));
    }
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, count);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPhotos(urls);
    setTransforms(urls.map(() => defaultTransform()));
    setStage("arrange");
  };

  const handleSlotClick = (index: number) => {
    if (index >= photos.length) return;

    if (swapMode) {
      if (swapIndex === null) {
        setSwapIndex(index);
        return;
      }
      if (swapIndex === index) {
        setSwapIndex(null);
        return;
      }
      setPhotos((prev) => {
        const next = [...prev];
        [next[swapIndex], next[index]] = [next[index], next[swapIndex]];
        return next;
      });
      setTransforms((prev) => {
        const next = [...prev];
        [next[swapIndex], next[index]] = [next[index], next[swapIndex]];
        return next;
      });
      setSwapIndex(null);
    } else {
      setEditIndex(index);
    }
  };

  const updateTransform = (index: number, patch: Partial<PhotoTransform>) => {
    setTransforms((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const resetTransform = (index: number) => {
    setTransforms((prev) => {
      const next = [...prev];
      next[index] = defaultTransform();
      return next;
    });
  };

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origOffsetX: transforms[index].offsetX,
      origOffsetY: transforms[index].offsetY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent, index: number) => {
    if (!dragState.current) return;
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const dx = (e.clientX - dragState.current.startX) / rect.width;
    const dy = (e.clientY - dragState.current.startY) / rect.height;
    updateTransform(index, {
      offsetX: dragState.current.origOffsetX + dx,
      offsetY: dragState.current.origOffsetY + dy,
    });
  };

  const handlePointerUp = () => {
    dragState.current = null;
  };

  const handleGenerate = async () => {
    setStage("generating");

    const gapPx = gapMm * MM_TO_PX;
    const { rows, cols } = grid;
    const cellW = (CANVAS_WIDTH - gapPx * (cols + 1)) / cols;
    const cellH = (CANVAS_HEIGHT - gapPx * (rows + 1)) / rows;

    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const images = await Promise.all(photos.map((src) => loadImage(src)));

    images.forEach((img, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = gapPx + col * (cellW + gapPx);
      const y = gapPx + row * (cellH + gapPx);
      drawImageWithTransform(ctx, img, x, y, cellW, cellH, transforms[i]);
    });

    canvas.toBlob((blob) => {
      if (blob) setResultUrl(URL.createObjectURL(blob));
      setStage("done");
    }, "image/png");
  };

  const reset = () => {
    setPhotos([]);
    setTransforms([]);
    setResultUrl(null);
    setSwapIndex(null);
    setEditIndex(null);
    setStage("setup");
  };

  const filledSlots = grid.rows * grid.cols;
  const gapPxPreview = gapMm * MM_TO_PX;
  const cellAspect =
    (CANVAS_WIDTH - gapPxPreview * (grid.cols + 1)) /
    grid.cols /
    ((CANVAS_HEIGHT - gapPxPreview * (grid.rows + 1)) / grid.rows);

  return (
    <div className="collage-tool">
      <div className="collage-tool__header">
        <span className="collage-tool__eyebrow">FREE TOOL</span>
        <h1 className="collage-tool__title">A3 print collage maker</h1>
        <p className="collage-tool__subtext">
          Choose how many photos, upload them, then zoom, pan, and rotate each
          one before generating a print-ready 19" x 13" collage at 300 DPI.
        </p>
      </div>

      {stage === "setup" && (
        <div className="collage-tool__setup">
          <label className="collage-tool__field">
            Number of photos
            <input
              type="number"
              min={1}
              max={30}
              value={count}
              onChange={(e) => handleCountChange(Number(e.target.value))}
            />
          </label>

          <label className="collage-tool__field">
            White gap between photos (mm)
            <input
              type="number"
              min={0}
              max={30}
              value={gapMm}
              onChange={(e) => setGapMm(Number(e.target.value))}
            />
          </label>

          <div className="collage-tool__grid-preview">
            Layout: {grid.rows} rows x {grid.cols} columns
            {filledSlots > count && (
              <span className="collage-tool__note">
                {" "}
                ({filledSlots - count} empty slot
                {filledSlots - count > 1 ? "s" : ""} left white)
              </span>
            )}
          </div>

          <label className="collage-tool__checkbox">
            <input
              type="checkbox"
              checked={gridOverride}
              onChange={(e) => setGridOverride(e.target.checked)}
            />
            Manually set rows/columns
          </label>

          {gridOverride && (
            <div className="collage-tool__manual-grid">
              <label>
                Rows
                <input
                  type="number"
                  min={1}
                  value={grid.rows}
                  onChange={(e) =>
                    setGrid((g) => ({ ...g, rows: Number(e.target.value) }))
                  }
                />
              </label>
              <label>
                Columns
                <input
                  type="number"
                  min={1}
                  value={grid.cols}
                  onChange={(e) =>
                    setGrid((g) => ({ ...g, cols: Number(e.target.value) }))
                  }
                />
              </label>
            </div>
          )}

          <button
            className="btn btn--primary"
            onClick={() => setStage("upload")}
          >
            Continue to upload
          </button>
        </div>
      )}

      {stage === "upload" && (
        <label className="collage-tool__dropzone">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            hidden
          />
          <span>Click to upload {count} photos</span>
        </label>
      )}

      {stage === "arrange" && (
        <div className="collage-tool__arrange">
          <div className="collage-tool__mode-bar">
            <p className="collage-tool__hint">
              {swapMode
                ? "Swap mode: click two photos to swap their position."
                : "Click a photo to zoom, pan, and rotate it. Drag directly on the photo to reposition."}
            </p>
            <button
              className={`btn ${swapMode ? "btn--primary" : "btn--ghost"}`}
              onClick={() => {
                setSwapMode((v) => !v);
                setSwapIndex(null);
                setEditIndex(null);
              }}
            >
              {swapMode ? "Done swapping" : "Swap photos"}
            </button>
          </div>

          <div
            className="collage-tool__grid"
            style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)` }}
          >
            {Array.from({ length: filledSlots }).map((_, i) => (
              <div
                key={i}
                className={`collage-tool__slot ${swapIndex === i ? "collage-tool__slot--selected" : ""} ${editIndex === i ? "collage-tool__slot--editing" : ""}`}
                style={{ aspectRatio: cellAspect }}
                onClick={() => handleSlotClick(i)}
              >
                {photos[i] ? (
                  <div
                    className="collage-tool__photo-frame"
                    onPointerDown={(e) => !swapMode && handlePointerDown(e, i)}
                    onPointerMove={(e) => !swapMode && handlePointerMove(e, i)}
                    onPointerUp={handlePointerUp}
                  >
                    <img
                      src={photos[i]}
                      alt=""
                      style={{
                        transform: `rotate(${transforms[i]?.rotation || 0}deg) scale(${transforms[i]?.zoom || 1}) translate(${(transforms[i]?.offsetX || 0) * 100}%, ${(transforms[i]?.offsetY || 0) * 100}%)`,
                      }}
                    />
                  </div>
                ) : (
                  <span className="collage-tool__empty">blank</span>
                )}
              </div>
            ))}
          </div>

          {editIndex !== null && photos[editIndex] && (
            <div className="collage-tool__edit-panel">
              <span className="collage-tool__edit-title">
                Editing photo {editIndex + 1}
              </span>

              <label className="collage-tool__slider">
                Zoom
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={transforms[editIndex].zoom}
                  onChange={(e) =>
                    updateTransform(editIndex, { zoom: Number(e.target.value) })
                  }
                />
              </label>

              <label className="collage-tool__slider">
                Rotate
                <input
                  type="range"
                  min={-180}
                  max={180}
                  step={1}
                  value={transforms[editIndex].rotation}
                  onChange={(e) =>
                    updateTransform(editIndex, {
                      rotation: Number(e.target.value),
                    })
                  }
                />
              </label>

              <p className="collage-tool__edit-hint">
                Drag directly on the photo above to pan it.
              </p>

              <div className="collage-tool__actions">
                <button
                  className="btn btn--ghost"
                  onClick={() => resetTransform(editIndex)}
                >
                  Reset
                </button>
                <button
                  className="btn btn--primary"
                  onClick={() => setEditIndex(null)}
                >
                  Done
                </button>
              </div>
            </div>
          )}

          <div className="collage-tool__actions">
            <button className="btn btn--ghost" onClick={reset}>
              Start over
            </button>
            <button className="btn btn--primary" onClick={handleGenerate}>
              Generate print file
            </button>
          </div>
        </div>
      )}

      {stage === "generating" && (
        <div className="collage-tool__status">
          <div className="collage-tool__spinner" />
          <p>Building your print file...</p>
        </div>
      )}

      {stage === "done" && resultUrl && (
        <div className="collage-tool__results">
          <img
            src={resultUrl}
            alt="Final collage"
            className="collage-tool__preview"
          />
          <p className="collage-tool__done-msg">
            Ready — print at actual size (300 DPI) on A3 paper.
          </p>
          <div className="collage-tool__actions">
            <a
              className="btn btn--primary"
              href={resultUrl}
              download="a3-collage.png"
            >
              Download collage
            </a>
            <button className="btn btn--ghost" onClick={reset}>
              Make another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
