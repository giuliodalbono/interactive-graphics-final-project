import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";

class Obstacle {
    constructor() {
        this.alreadyCollided = false;
        const geometry = new THREE.BoxGeometry(30, 30, 30);
        const material = new THREE.MeshPhongMaterial({ color: Colors.red });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.resetPosition();
    }

    resetPosition() {
        this.mesh.position.set(1200 + Math.random() * 300, 0, -50); // Random Z position
        this.alreadyCollided = false;
    }

    move() {
        this.mesh.position.x -= 2.5;
        if (this.mesh.position.x < -600) {
            this.resetPosition();
        }
    }

    animateCrash() {
        const duration = 500;
        const endTime = Date.now() + duration;
        const originalScale = obstacle.mesh.scale.clone();

        function crash() {
            const now = Date.now();
            const elapsed = now - (endTime - duration);
            const progress = elapsed / duration;

            if (progress < 1) {
                // Scale down the obstacle
                const scale = 1 - progress;
                obstacle.mesh.scale.set(originalScale.x * scale, originalScale.y * scale, originalScale.z * scale);

                // Fade out the obstacle
                obstacle.mesh.material.opacity = 1 - progress;
                obstacle.mesh.material.transparent = true;

                // Continue the animation
                requestAnimationFrame(crash);
            } else {
                // Once the animation is complete, reset the obstacle
                obstacle.mesh.scale.set(1, 1, 1);
                obstacle.mesh.material.opacity = 1;
                obstacle.mesh.material.transparent = false;
                obstacle.resetPosition();
            }
        }
        crash()
    }
}

export function createObstacle() {
    window['obstacle'] = new Obstacle();
    scene.add(obstacle.mesh);
}