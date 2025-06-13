import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { BrickPlane } from "./objects/plane";
import { RockSphere } from "./objects/sphere";

// --- Main Game Scene ---
function GameScene() {
  // Calculate sphere Y position as in original code
  const sphereY = 0 + 0.2 + 1; // plane.position.y + plane.depth + sphere.radius
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      {/* Objects */}
      <BrickPlane />
      <RockSphere position={[0, sphereY, 0]} />
      {/* Controls */}
      <OrbitControls enableDamping />
    </>
  );
}

export default function Game() {
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
  ];

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [0, 12, 12], fov: 50 }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <GameScene />
      </Canvas>
    </KeyboardControls>
  );
}
