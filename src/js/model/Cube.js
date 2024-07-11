import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";

class Cube {
    constructor() {
        const geometry = new THREE.BoxGeometry(50, 50, 50);
        this.material = new THREE.MeshPhongMaterial({ color: Colors.pink });
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.castShadow = true;

        // Initial position of the cube (on top of the Earth)
        this.mesh.position.y = 0;
        this.mesh.position.z = -50;
    }

    checkCollision(obstacle) {
        const cubeBox = new THREE.Box3().setFromObject(this.mesh);
        const obstacleBox = new THREE.Box3().setFromObject(obstacle.mesh);
        return cubeBox.intersectsBox(obstacleBox);
    }

    animateCollision() {
        const duration = 100;
        const endTime = Date.now() + duration;
        const vibrationDistance = 5;

        function vibrate() {
            const now = Date.now();
            const elapsed = now - (endTime - duration);
            const progress = elapsed / duration;

            if (progress < 1) {
                // Change color to red
                cube.material.color.setHex(Colors.red)

                // Vibration of the cube (random position change)
                const offsetX = (Math.random() - 0.5) * vibrationDistance;
                const offsetY = (Math.random() - 0.5) * vibrationDistance;
                cube.mesh.position.x += offsetX;
                cube.mesh.position.y += offsetY;

                // Reset cube position to the original for the next collisions
                setTimeout(() => {
                    cube.mesh.position.x -= offsetX;
                    cube.mesh.position.y -= offsetY;
                }, duration / 10);

                requestAnimationFrame(vibrate);
            } else {
                // Reset cube color to the original
                cube.material.color.setHex(Colors.pink)
            }
        }
        vibrate();
    }
}

// Instantiate the cube and add it to the scene
export function createCube(){
    window['cube'] = new Cube();

    // Add the mesh of the cube to the scene
    scene.add(cube.mesh);
}