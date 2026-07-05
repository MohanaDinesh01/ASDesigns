import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WireframeShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.1;
      innerRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group position={[3, 0, -1]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial
          color="#E9862A"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial
          color="#21B1F0"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}
