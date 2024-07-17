import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";

/**
 * Class representing an obstacle.
 */
class Obstacle {
    constructor() {
        this.alreadyCollided = false; // Flag which indicates if the obstacle has already collided with the cube
        this.obstacleVelocity = 2.5; // Initial obstacle velocity

        // Simple cube geometry
        const geometry = new THREE.BoxGeometry(30, 30, 30);

        const material = new THREE.MeshPhongMaterial({ color: Colors.red });
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.castShadow = true;

        // Setting an initial position
        this.resetPosition();
    }

    /**
     * Resets obstacle position at the right of the camera, so it can get inside the scene again.
     */
    resetPosition() {
        this.mesh.position.set(600 + Math.random() * 200, 0, -50);

        // Reset the flag for collision
        this.alreadyCollided = false;
    }

    /**
     * Moves the obstacle to the left with the velocity set at the moment.
     */
    move() {
        this.mesh.position.x -= this.obstacleVelocity;

        // If obstacle exits from the scene, reset its position with a random delay between 0 and 2 seconds
        if (this.mesh.position.x < -600) {
            setTimeout(() => {
                this.resetPosition();
            }, Math.random() * 2000);
        }
    }

    /**
     * Function responsible for the animation of crashing of the obstacle after the collision with the cube.
     */
    animateCrash() {
        const duration = 500;
        const endTime = Date.now() + duration;

        // Saving original scale of the obstacle
        const originalScale = obstacle.mesh.scale.clone();

        /**
         * The crash is simulated with the scale down of the obstacle's size.
         */
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

    /**
     * Increments speed, until the cap of obstacle velocity is reached (7.5).
     */
    incrementSpeed() {
        if (this.obstacleVelocity < 7.5) {
            this.obstacleVelocity += 0.001;
        }
    }
}

/**
 * Instantiates the earth and adds it to the scene.
 */
export function createObstacle() {
    window['obstacle'] = new Obstacle();
    scene.add(obstacle.mesh);
}