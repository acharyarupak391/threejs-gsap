import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { sphere } from "./objects/sphere";
import { plane } from "./objects/plane";

import { keyMaps } from "./utils/key-control";

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
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

// Add a soft ambient light to fill the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add a directional light to cast shadows and create highlights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 5, 5); // Position it to shine on the plane
scene.add(directionalLight);

// lay the plane on the ground
plane.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
plane.position.set(0, 0, 0); // Position the plane at the origin
scene.add(plane);

console.log({ sphere, plane });
const sphereY =
  plane.position.y +
  plane.geometry.parameters.depth +
  sphere.geometry.parameters.radius;

// place in top-right corner
sphere.position.set(0, sphereY, 0);
scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  control.update();

  const isAnyKeyPressed =
    keyMaps.ArrowUp ||
    keyMaps.ArrowDown ||
    keyMaps.ArrowLeft ||
    keyMaps.ArrowRight;

  if (!isAnyKeyPressed) return;

  const SPEED = 0.01; // Speed of movement

  // const vericalRotationInDegrees = THREE.MathUtils.radToDeg(
  //   control.getAzimuthalAngle()
  // );
  // const constrainedRotation = ((vericalRotationInDegrees % 360) + 360) % 360;

  if (keyMaps.ArrowUp) {
    sphere.position.z -= SPEED;
    sphere.rotation.x -= SPEED;
  }

  if (keyMaps.ArrowDown) {
    sphere.position.z += SPEED;
    sphere.rotation.x += SPEED;
  }

  if (keyMaps.ArrowLeft) {
    sphere.position.x -= SPEED;
    sphere.rotation.z += SPEED;
  }

  if (keyMaps.ArrowRight) {
    sphere.position.x += SPEED;
    sphere.rotation.z -= SPEED;
  }
}
animate();

// handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
