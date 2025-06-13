import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { useRef } from "react";
import { FC } from "react";
import * as THREE from "three";

export const BrickPlane: FC = () => {
  const [colorMap, aoMap, normalMap, displacementMap] = useTexture([
    "/textures/brick/Bricks097_1K-JPG_Color.jpg",
    "/textures/brick/Bricks097_1K-JPG_AmbientOcclusion.jpg",
    "/textures/brick/Bricks097_1K-JPG_NormalGL.jpg",
    "/textures/brick/Bricks097_1K-JPG_Displacement.jpg",
  ]);
  const mesh = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (mesh.current) {
      // Copy UVs for aoMap/displacementMap
      mesh.current.geometry.setAttribute(
        "uv2",
        mesh.current.geometry.attributes.uv
      );
    }
  }, []);

  return (
    <mesh
      ref={mesh}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <boxGeometry args={[8, 8, 0.2, 200, 200, 5]} />
      <meshStandardMaterial
        map={colorMap}
        aoMap={aoMap}
        aoMapIntensity={1}
        normalMap={normalMap}
        displacementMap={displacementMap}
        displacementScale={0.1}
      />
    </mesh>
  );
};
