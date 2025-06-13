import * as THREE from 'three';

// --- Texture Loading ---
const textureLoader = new THREE.TextureLoader();
const texturePath = 'textures/brick/'; // The path to your brick folder

const colorMap = textureLoader.load(texturePath + 'Bricks097_1K-JPG_Color.jpg');
const aoMap = textureLoader.load(texturePath + 'Bricks097_1K-JPG_AmbientOcclusion.jpg');
const normalMap = textureLoader.load(texturePath + 'Bricks097_1K-JPG_NormalGL.jpg'); // Use the GL version!
const roughnessMap = textureLoader.load(texturePath + 'Bricks097_1K-JPG_Roughness.jpg');
const displacementMap = textureLoader.load(texturePath + 'Bricks097_1K-JPG_Displacement.jpg');

const boxGeometry = new THREE.BoxGeometry(
    8,    // width
    8,    // height
    0.2,  // depth (this gives it thickness!)
    200,  // widthSegments
    200,  // heightSegments
    5     // depthSegments
);


// The material stays the same
const brickMaterial = new THREE.MeshStandardMaterial({
    map: colorMap,
    aoMap: aoMap,
    aoMapIntensity: 1,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    displacementMap: displacementMap,
    displacementScale: 0.1
});

// --- Create the Mesh ---
const plane = new THREE.Mesh(boxGeometry, brickMaterial);

// IMPORTANT: AO and Displacement maps require a second set of UV coordinates.
// We can simply copy the existing UVs to a new attribute named 'uv2'.
plane.geometry.setAttribute('uv2', plane.geometry.attributes.uv);

module.exports = {
    plane
};