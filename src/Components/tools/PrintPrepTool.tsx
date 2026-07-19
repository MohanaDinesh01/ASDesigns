import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import { removeBackground } from "@imgly/background-removal";
import {
  getCroppedCanvas,
  canvasToBlob,
  splitCanvasVertically,
  type PixelCrop,
} from "../../utils/cropImage";
import EraserCanvas from "./EraserCanvas";
import "./PrintPrepTool.css";

// 19in x 26in at 300 DPI
const TARGET_WIDTH = 19 * 300; // 5700px
const TARGET_HEIGHT = 26 * 300; // 7800px
const ASPECT = TARGET_WIDTH / TARGET_HEIGHT;

type Stage =
  | "upload"
  | "position"
  | "processing"
  | "touchup"
  | "generating"
  | "done"
  | "error";

export default function PrintPrepTool() {
  const [rotation, setRotation] = useState(0);
  const [stage, setStage] = useState<Stage>("upload");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null,
  );
  const [progressLabel, setProgressLabel] = useState("");
  const [topUrl, setTopUrl] = useState<string | null>(null);
  const [bottomUrl, setBottomUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [originalFullUrl, setOriginalFullUrl] = useState<string | null>(null);
  const [noBgUrl, setNoBgUrl] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageSrc(URL.createObjectURL(file));
    setStage("position");
  };

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPx: Area) => {
      setCroppedAreaPixels(croppedAreaPx);
    },
    [],
  );

  const handleProcess = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setStage("processing");
    setErrorMsg("");

    try {
      setProgressLabel("Positioning image...");
      const fullCanvas = await getCroppedCanvas(
        imageSrc,
        croppedAreaPixels,
        TARGET_WIDTH,
        TARGET_HEIGHT,
        rotation,
      );
      const fullBlob = await canvasToBlob(fullCanvas);
      const fullUrl = URL.createObjectURL(fullBlob);
      setOriginalFullUrl(fullUrl);

      setProgressLabel(
        "Removing background (this can take 20-40 seconds for best quality)...",
      );
      const noBgBlob = await removeBackground(fullBlob, {
        model: "isnet",
        output: { format: "image/png", quality: 1 },
        progress: (_key, current, total) => {
          setProgressLabel(
            `Removing background... ${Math.round((current / total) * 100)}%`,
          );
        },
      });

      setNoBgUrl(URL.createObjectURL(noBgBlob));
      setStage("touchup");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Something went wrong processing this image. Please try a different photo.",
      );
      setStage("error");
    }
  };

  const handleTouchupDone = async (finalCanvas: HTMLCanvasElement) => {
    setStage("generating");
    setProgressLabel("Preparing print files...");

    // Flatten the transparent image onto a white background
    const flattenedCanvas = document.createElement("canvas");
    flattenedCanvas.width = finalCanvas.width;
    flattenedCanvas.height = finalCanvas.height;
    const flattenedCtx = flattenedCanvas.getContext("2d")!;
    flattenedCtx.fillStyle = "#FFFFFF";
    flattenedCtx.fillRect(0, 0, flattenedCanvas.width, flattenedCanvas.height);
    flattenedCtx.drawImage(finalCanvas, 0, 0);

    const { top, bottom } = splitCanvasVertically(flattenedCanvas);
    const topBlob = await canvasToBlob(top);
    const bottomBlob = await canvasToBlob(bottom);

    setTopUrl(URL.createObjectURL(topBlob));
    setBottomUrl(URL.createObjectURL(bottomBlob));
    setStage("done");
  };

  const reset = () => {
    setImageSrc(null);
    setTopUrl(null);
    setBottomUrl(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setStage("upload");
  };

  return (
    <div className="print-prep">
      <div className="print-prep__header">
        <span className="print-prep__eyebrow">FREE TOOL</span>
        <h1 className="print-prep__title">Print prep tool</h1>
        <p className="print-prep__subtext">
          Upload your photo, position it in frame, and we'll remove the
          background, resize it for print, and split it into two A3-ready halves
          you can join together.
        </p>
      </div>

      {stage === "upload" && (
        <label className="print-prep__dropzone">
          <input type="file" accept="image/*" onChange={onFileChange} hidden />
          <span>Click to upload an image</span>
        </label>
      )}

      {stage === "position" && imageSrc && (
        <div className="print-prep__editor">
          <div className="print-prep__cropper">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={ASPECT}
              minZoom={0.4}
              maxZoom={3}
              restrictPosition={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="print-prep__controls">
            <label>
              Zoom
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
            </label>
            <label>
              Rotate
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
              />
            </label>
            <div className="print-prep__actions">
              <button className="btn btn--ghost" onClick={reset}>
                Choose different image
              </button>
              <button className="btn btn--primary" onClick={handleProcess}>
                Process image
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === "processing" && (
        <div className="print-prep__status">
          <div className="print-prep__spinner" />
          <p>{progressLabel}</p>
        </div>
      )}

      {stage === "error" && (
        <div className="print-prep__status">
          <p className="print-prep__error">{errorMsg}</p>
          <button className="btn btn--primary" onClick={reset}>
            Try again
          </button>
        </div>
      )}

      {stage === "done" && topUrl && bottomUrl && (
        <div className="print-prep__results">
          <p className="print-prep__done-msg">
            Ready. Print both on A3 paper at actual size (300 DPI), then join
            them along the center edge.
          </p>
          <div className="print-prep__downloads">
            <div className="print-prep__download-card">
              <img src={topUrl} alt="Top half preview" />
              <a
                className="btn btn--primary"
                href={topUrl}
                download="print-top-half.png"
              >
                Download top half
              </a>
            </div>
            <div className="print-prep__download-card">
              <img src={bottomUrl} alt="Bottom half preview" />
              <a
                className="btn btn--primary"
                href={bottomUrl}
                download="print-bottom-half.png"
              >
                Download bottom half
              </a>
            </div>
          </div>
          <button className="btn btn--ghost" onClick={reset}>
            Process another image
          </button>
        </div>
      )}

      {stage === "touchup" && originalFullUrl && noBgUrl && (
        <EraserCanvas
          originalImageUrl={originalFullUrl}
          noBgImageUrl={noBgUrl}
          width={TARGET_WIDTH}
          height={TARGET_HEIGHT}
          onDone={handleTouchupDone}
        />
      )}
    </div>
  );
}
