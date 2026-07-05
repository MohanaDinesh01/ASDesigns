import { useScrollProgress } from "../../three/hooks/useScrollProgress";
import { formatTimecode } from "../../utils/formatTimecode";
import "./ScrollPlayhead.css";

export default function ScrollPlayhead() {
  const progress = useScrollProgress();

  return (
    <div className="playhead" aria-hidden="true">
      <div className="playhead__track">
        <div
          className="playhead__fill"
          style={{ height: `${progress * 100}%` }}
        />
        <div className="playhead__marker" style={{ top: `${progress * 100}%` }}>
          <div className="playhead__dot" />
          <span className="playhead__timecode">{formatTimecode(progress)}</span>
        </div>
      </div>
    </div>
  );
}
