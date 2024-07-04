import * as THREE from "../../../vendors/three.module.js";
import { Cloud } from "./Cloud.js";

class Sky {
    constructor() {
        // Create an empty container
        this.mesh = new THREE.Object3D();

        // Choose a number of clouds to be scattered in the sky
        this.nClouds = 30;

        // Define the horizontal spacing between clouds
        this.horizontalSpacing = 200;

        // Create the clouds
        for (let i = 0; i < this.nClouds; i++) {
            const c = new Cloud();

            // Set the position of each cloud along the x-axis
            c.mesh.position.x = i * this.horizontalSpacing - (this.nClouds / 2) * this.horizontalSpacing;

            // Set a constant y position (height) for the clouds
            c.mesh.position.y = 300 + Math.random() * 100;

            // For a better result, we position the clouds at random depths inside the scene
            c.mesh.position.z = -400 - Math.random() * 400;

            // We also set a random scale for each cloud
            const s = 1 + Math.random() * 2;
            c.mesh.scale.set(s, s, s);

            // Add the mesh of each cloud in the scene
            this.mesh.add(c.mesh);
        }
    }
}

// Instantiate the sky and add it to the scene


export function createSky(){
    window['sky'] = new Sky();
    scene.add(sky.mesh);
}