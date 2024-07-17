import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";

/**
 * Class representing the plus sign applied upon the cube when a coin is collected.
 */
export class Plus {
    constructor(cube) {
        const material = new THREE.MeshBasicMaterial({ color: Colors.gold });

        // Creating 2 bars, 1 horizontal and 1 vertical so that we can combine them to create a plus sign
        const horizontalBar = new THREE.Mesh(new THREE.PlaneGeometry(10, 2.5), material);
        const verticalBar = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 10), material);

        // Combining the 2 bars
        this.plusGroup = new THREE.Group();
        this.plusGroup.add(horizontalBar);
        this.plusGroup.add(verticalBar);

        // Setting position of the plus on top of the cube
        this.plusGroup.position.set(cube.mesh.position.x, cube.mesh.position.y + 40 * cube.mesh.scale.y, cube.mesh.position.z);

        return this.plusGroup;
    }
}