import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";

class Cube {
    constructor() {
        const geometry = new THREE.BoxGeometry(50, 50, 50);
        const material = new THREE.MeshPhongMaterial({ color: Colors.pink });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;

        // Initial position of the cube (on top of the Earth)
        this.mesh.position.y = 0;
        this.mesh.position.z = -50;
    }
}

// Instantiate the cube and add it to the scene
export function createCube(){
    window['cube'] = new Cube();

    // Add the mesh of the cube to the scene
    scene.add(cube.mesh);
}