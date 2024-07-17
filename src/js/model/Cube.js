import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";
import { isJumping } from "../jump.js";
import { Plus } from "./Plus.js";

/**
 * Class representing the cube, the character of the game.
 */
class Cube {
    constructor() {
        // Simple cube geometry
        const geometry = new THREE.BoxGeometry(50, 50, 50);

        this.material = new THREE.MeshPhongMaterial({ color: Colors.pink });

        this.mesh = new THREE.Mesh(geometry, this.material);

        this.mesh.castShadow = true;

        this.scale = 1;

        // Initial position of the cube (on top of the Earth)
        this.mesh.position.y = 0;
        this.mesh.position.z = -50;
    }

    /**
     * Validator which checks if the cube has collided with an obstacle or a coin.
     * @param obstacle Object to test if a collision has happened.
     * @return {boolean} Returns:
     * - True if the cube has collided with the obstacle.
     * - False otherwise.
     */
    checkCollision(obstacle) {
        const cubeBox = new THREE.Box3().setFromObject(this.mesh);
        const obstacleBox = new THREE.Box3().setFromObject(obstacle.mesh);
        return cubeBox.intersectsBox(obstacleBox);
    }

    /**
     * Function responsible for animating the cube in case of a collision with an obstacle. Basically the cube changes
     * its color to red and starts vibrating for a few.
     */
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

                // Reset cube position to the original
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
        // If during the collision the cube is jumping, then set this flag to true which will cause the cube to bounce
        // as a reaction to the collision
        if (isJumping) {
            window['bounce'] = true;
        }
        vibrate();
    }

    /**
     * Reduces the cube size in proportion to how many lives have left to the player.
     */
    reduceCube() {
        this.scale = this.scale - (this.scale / window['lives']);
        cube.mesh.scale.set(this.scale, this.scale, this.scale);
    }

    /**
     * Function responsible for animating the cube after a coin has been collected. Basically the cube changes its color
     * to gold, and a small plus appears on top of the cube.
     */
    earnedCoinAnimation() {
        const duration = 100;
        const endTime = Date.now() + duration;

        // Creating the plus sign and adding it to scene
        const plusSign = new Plus(cube);
        scene.add(plusSign);

        /**
         * Turns the color into gold and adds the plus sign for a short time.
         */
        function shine() {
            const now = Date.now();
            const elapsed = now - (endTime - duration);
            const progress = elapsed / duration;

            if (progress < 1) {
                cube.material.color.setHex(Colors.gold);
                requestAnimationFrame(shine);
            } else {
                cube.material.color.setHex(Colors.pink);
                scene.remove(plusSign);
            }
        }
        shine();
    }
}

/**
 * Instantiates the cube and adds it to the scene.
 */
export function createCube(){
    window['cube'] = new Cube();
    scene.add(cube.mesh);
}