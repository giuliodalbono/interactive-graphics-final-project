import * as THREE from "../../../vendors/three.module.js";

/**
 * Class representing the earth.
 */
class Earth {
    constructor() {
        // Loading and configuring texture
        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load('resources/data/model/floor-texture.jpg');
        earthTexture.wrapS = earthTexture.wrapT = THREE.RepeatWrapping;

        // Simple plane geometry
        const geometry = new THREE.PlaneGeometry(1200, 600, 64, 64);

        // Rotating plane
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        // Applying texture
        const material = new THREE.MeshPhongMaterial({ map: earthTexture });
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.receiveShadow = true;
    }
}

/**
 * Instantiates the earth and adds it to the scene.
 */
export function createEarth(){
    window['earth'] = new Earth();
    scene.add(earth.mesh);
}