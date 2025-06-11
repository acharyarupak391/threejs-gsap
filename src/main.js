import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// scene: our 3d world
const scene = new THREE.Scene();

// camera: our viewpoint
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// renderer: the engine which draws the scene into the screen
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// adding controls orbitcontrols from addons
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

// add better lights for the new MeshStandardMaterial
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

// add point light for highlighting
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(3, 5, 5);
scene.add(pointLight);

// mesh: the visible object/cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// const cubeMaterial = new THREE.MeshBasicMaterial({
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0.5,
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -1.5;
scene.add(cube);

// adding normal texture for sphere
const textureLoader = new THREE.TextureLoader();
const bricksTexture = textureLoader.load(
  "https://threejs.org/examples/textures/brick_diffuse.jpg"
);

// normal texture sphere
const normalSphereGeometry = new THREE.SphereGeometry(1, 128, 128); // radius, widthSegments, heightSegments

// use normal textures
const normalSphereMaterial = new THREE.MeshStandardMaterial({
  map: bricksTexture,
  roughness: 0.5,
});

const normalSphere = new THREE.Mesh(normalSphereGeometry, normalSphereMaterial);
normalSphere.position.x = 1.5;
scene.add(normalSphere);

// load PBR textures
const pbrTextureLoader = new THREE.TextureLoader();
const texturePath = "textures/"; // Change if your folder has a different name

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
sphere.position.x = 4.5;
scene.add(sphere);

camera.position.z = 7;

// animate the cube
function animate() {
  requestAnimationFrame(animate);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  cube.rotateX(0.01);
  cube.rotateY(0.01);

  sphere.rotation.x += 0.001;
  sphere.rotation.y -= 0.001;

  // console.log("position: ", cube.rotation);

  // required if enableDamping is true
  control.update();

  renderer.render(scene, camera);
}

// handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
