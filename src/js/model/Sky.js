import * as THREE from "../../../vendors/three.module.js";
import { Cloud } from "./Cloud.js";

/**
 * Class representing the sky.
 */
class Sky {
    constructor() {
        // Empty container which will be filled with clouds
        this.mesh = new THREE.Object3D();

        this.nClouds = 30;

        // Horizontal spacing between clouds
        this.horizontalSpacing = 200;

        // Create the clouds
        for (let i = 0; i < this.nClouds; i++) {
            const c = new Cloud();

            // Set the position of each cloud along the x-axis
            c.mesh.position.x = i * this.horizontalSpacing - (this.nClouds / 2) * this.horizontalSpacing;

            // Set the position of each cloud along the y-axis
            c.mesh.position.y = 300 + Math.random() * 100;

            // Set the position of each cloud along the z-axis
            c.mesh.position.z = -400 - Math.random() * 400;

            // Set a random scale for each cloud
            const s = 1 + Math.random() * 2;
            c.mesh.scale.set(s, s, s);

            // Add the mesh of each cloud in the scene
            this.mesh.add(c.mesh);
        }
    }
}

/**
 * Instantiates the sky and adds it to the scene.
 */
export function createSky(){
    window['sky'] = new Sky();
    scene.add(sky.mesh);
}