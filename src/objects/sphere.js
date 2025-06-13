import * as THREE from "three";

// load PBR textures
const pbrTextureLoader = new THREE.TextureLoader();
const texturePath = "textures/rock/"; // Change if your folder has a different name

const colorMap = pbrTextureLoader.load(
  texturePath + "GreyRock02_2K_BaseColor.png"
);
const normalMap = pbrTextureLoader.load(
  texturePath + "GreyRock02_2K_Normal.png"
);
const roughnessMap = pbrTextureLoader.load(
  texturePath + "GreyRock02_2K_Roughness.png"
);
const aoMap = pbrTextureLoader.load(texturePath + "GreyRock02_2K_AO.png");
const metalnessMap = pbrTextureLoader.load(
  texturePath + "GreyRock02_2K_Metallic.png"
);
const displacementMap = pbrTextureLoader.load(
  texturePath + "GreyRock02_2K_Height.png"
);

// mesh: sphere
const sphereGeometry = new THREE.SphereGeometry(1, 64, 64); // radius, widthSegments, heightSegments

// use PBR textures
const sphereMaterial = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  roughnessMap: roughnessMap,
  aoMap: aoMap,
  aoMapIntensity: 1,
  metalnessMap: metalnessMap,
  displacementMap: displacementMap,
  displacementScale: 0.05, // Adjust this value to control the "height" of the bumps
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

module.exports = {
  sphere,
};