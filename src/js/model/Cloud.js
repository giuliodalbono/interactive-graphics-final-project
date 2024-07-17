import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";

/**
 * Class representing a cloud in the sky.
 */
export class Cloud {
    constructor() {
        // Empty container that will hold the different parts of the cloud
        this.mesh = new THREE.Object3D();

        // Simple cube geometry, which will be duplicated to create the cloud
        const geometry = new THREE.BoxGeometry(20, 20, 20);

        const material = new THREE.MeshPhongMaterial({ color: Colors.white });

        // Duplicate the geometry a random number of times
        const nBlocs = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < nBlocs; i++ ) {
            const mesh = new THREE.Mesh(geometry, material);

            // Set the position and the rotation of each cube randomly
            mesh.position.x = i * 15;
            mesh.position.y = Math.random() * 10;
            mesh.position.z = Math.random() * 10;
            mesh.rotation.z = Math.random() * Math.PI * 2;
            mesh.rotation.y = Math.random() * Math.PI * 2;

            // Set the size of the cube randomly
            const scale = 0.1 + Math.random() * 0.9;
            mesh.scale.set(scale, scale, scale);

            mesh.castShadow = true;
            mesh.receiveShadow = true;

            this.mesh.add(mesh);
        }
    }
}