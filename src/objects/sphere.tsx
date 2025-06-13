import { useRef } from "react";
import { FC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls, useTexture } from "@react-three/drei";

export const RockSphere: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const [
    colorMap,
    normalMap,
    roughnessMap,
    aoMap,
    metalnessMap,
    displacementMap,
  ] = useTexture([
    "/textures/rock/GreyRock02_2K_BaseColor.png",
    "/textures/rock/GreyRock02_2K_Normal.png",
    "/textures/rock/GreyRock02_2K_Roughness.png",
    "/textures/rock/GreyRock02_2K_AO.png",
    "/textures/rock/GreyRock02_2K_Metallic.png",
    "/textures/rock/GreyRock02_2K_Height.png",
  ]);
  const mesh = useRef<THREE.Mesh>(null!);

  const [sub, get] = useKeyboardControls();

  // Keyboard movement
  useFrame(() => {
    const { forward, backward, left, right, jump } = get();

    const speed = 0.01;

    if (forward) {
      mesh.current.position.z -= speed;
    }
    if (backward) {
      mesh.current.position.z += speed;
    }
    if (left) {
      mesh.current.position.x -= speed;
    }
    if (right) {
      mesh.current.position.x += speed;
    }
    if (jump) {
      mesh.current.position.y += speed;
    }
  });

  return (
    <mesh ref={mesh} position={position} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        aoMapIntensity={1}
        metalnessMap={metalnessMap}
        displacementMap={displacementMap}
        displacementScale={0.05}
      />
    </mesh>
  );
};
