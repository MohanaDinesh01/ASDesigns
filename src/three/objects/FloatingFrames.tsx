import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FRAME_COUNT = 10;

// Colors alternate between the two brand accents for the glow effect
const COLORS = ["#E9862A", "#21B1F0"];

export default function FloatingFrames() {
  const groupRef = useRef<THREE.Group>(null);

  const frames = useMemo(() => {
    return Array.from({ length: FRAME_COUNT }, (_, i) => {
      // Keep frames OFF the center where the headline text sits.
      // Randomly pick left side (-4 to -2) or right side (2 to 4).
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (2 + Math.random() * 2);

      return {
        position: [
          x,
          (Math.random() - 0.5) * 3.5,
          (Math.random() - 0.5) * 2,
        ] as [number, number, number],
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        floatOffset: Math.random() * Math.PI * 2,
        scale: 0.25 + Math.random() * 0.3,
        color: COLORS[i % 2],
        key: i,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const f = frames[i];
      child.rotation.z += f.rotationSpeed * 0.01;
      child.position.y += Math.sin(t * 0.5 + f.floatOffset) * 0.001;
    });
    groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {frames.map((f) => (
        <mesh key={f.key} position={f.position} scale={f.scale}>
          <planeGeometry args={[1, 0.6]} />
          <meshBasicMaterial
            color={f.color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
