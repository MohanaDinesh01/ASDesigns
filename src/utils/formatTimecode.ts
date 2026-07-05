// Converts scroll progress (0–1) into a fake timecode, treating the whole
// page as a fixed-length "recording" — reinforces the timeline brand motif.
const TOTAL_SECONDS = 90; // arbitrary "runtime" for the whole page scroll

export function formatTimecode(progress: number): string {
  const totalFrames = Math.floor(progress * TOTAL_SECONDS * 30); // 30fps
  const frames = totalFrames % 30;
  const totalSeconds = Math.floor(totalFrames / 30);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}
