import * as THREE from "three";

// scene: our 3d world
const scene = new THREE.Scene();

// camera: our viewpoint
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 12;
camera.updateProjectionMatrix();

// renderer: the engine which draws the scene into the screen
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
  antialias: true,
  alpha: true, // Enable transparency
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add better lights for the new MeshStandardMaterial
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

// add point light for highlighting
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(3, 5, 5);
scene.add(pointLight);

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
const sphereGeometry = new THREE.SphereGeometry(1, 128, 128); // radius, widthSegments, heightSegments

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
// place in top-right corner
sphere.position.set(5, 4, 0);

scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

module.exports = {
  sphere,
};
