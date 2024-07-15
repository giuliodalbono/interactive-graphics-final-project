import * as THREE from "../../../vendors/three.module.js";

class Earth {
    constructor() {
        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load('resources/data/model/floor11.jpg');
        earthTexture.wrapS = earthTexture.wrapT = THREE.RepeatWrapping;

        const geometry = new THREE.PlaneGeometry(1200, 600, 64, 64);
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        const material = new THREE.MeshPhongMaterial({ map: earthTexture });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.receiveShadow = true;
    }
}

// Instantiate the earth and add it to the scene
export function createEarth(){
    window['earth'] = new Earth();
    // Add the mesh of the earth to the scene
    scene.add(earth.mesh);
}