import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

export default function ThreeDBackground() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="hotpink" />
      </Sphere>
    </Canvas>
  );
}
