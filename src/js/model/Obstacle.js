import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";

class Obstacle {
    constructor() {
        this.alreadyCollided = false;
        this.obstacleVelocity = 2.5;
        const geometry = new THREE.BoxGeometry(30, 30, 30);
        const material = new THREE.MeshPhongMaterial({ color: Colors.red });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.resetPosition();
    }

    resetPosition() {
        this.mesh.position.set(600 + Math.random() * 200, 0, -50);
        this.alreadyCollided = false;
    }

    move() {
        this.mesh.position.x -= this.obstacleVelocity;
        if (this.mesh.position.x < -600) {
            setTimeout(() => {
                this.resetPosition();
            }, Math.random() * 2000); // Random delay between 0 and 5 seconds
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

    incrementSpeed() {
        if (this.obstacleVelocity < 7.5) {
            this.obstacleVelocity += 0.001;
        }
    }
}

export function createObstacle() {
    window['obstacle'] = new Obstacle();
    scene.add(obstacle.mesh);
}