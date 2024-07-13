import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";

export class Plus {
    constructor(cube) {
        const material = new THREE.MeshBasicMaterial({ color: Colors.gold });
        const horizontalBar = new THREE.Mesh(new THREE.PlaneGeometry(10, 2.5), material);
        const verticalBar = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 10), material);

        this.plusGroup = new THREE.Group();
        this.plusGroup.add(horizontalBar);
        this.plusGroup.add(verticalBar);
        this.plusGroup.position.set(cube.mesh.position.x, cube.mesh.position.y + 40 * cube.mesh.scale.y, cube.mesh.position.z);

        return this.plusGroup;
    }
}