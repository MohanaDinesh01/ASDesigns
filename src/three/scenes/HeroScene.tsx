import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FloatingFrames from "../objects/FloatingFrames";

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <FloatingFrames />
      </Suspense>
    </Canvas>
  );
}
