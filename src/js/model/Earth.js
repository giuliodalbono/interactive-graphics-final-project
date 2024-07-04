import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";

class Earth {
    constructor() {
        const geometry = new THREE.PlaneGeometry(1200, 600, 64, 64);
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        const material = new THREE.MeshPhongMaterial({ color: Colors.brown });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.receiveShadow = true;
    }
}

// Instantiate the earth and add it to the scene
export function createEarth(){
    const earth = new Earth();

    // Add the mesh of the earth to the scene
    scene.add(earth.mesh);
}