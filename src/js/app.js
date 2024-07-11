/**
 * Main js for application.
 */
import { createScene } from "./scene.js";
import { createLights } from "./light.js";
import { createEarth } from "./model/Earth.js";
import { createSky } from "./model/Sky.js";
import { createCube } from "./model/Cube.js";
import { animateCube } from "./jump.js";
import { createObstacle } from "./model/Obstacle.js";

window.addEventListener('load', init, false);

function init() {
    // Set up the scene, the camera and the renderer
    createScene();

    // Add the lights
    createLights();

    // Create Sea
    createEarth();

    // Create Cube
    createCube();

    // Create Sky
    createSky();

    // Create Obstacles
    createObstacle();

    // Move the clouds in the sky
    animationLoop();

    // Animate cube
    animateCube();
}

function animationLoop(){
    // Update cloud position to make feel there is movement
    sky.mesh.children.forEach(cloud => {
        cloud.position.x -= 5;

        // Recycle the cloud if it exits from the scene
        if (cloud.position.x < -((sky.nClouds / 2) * sky.horizontalSpacing)) {
            cloud.position.x += sky.nClouds * sky.horizontalSpacing;
        }
    });

    // Move obstacle
    obstacle.move();

    // Check for collision with the cube
    if (cube.checkCollision(obstacle)) {
        cube.animateCollision();
        obstacle.animateCrash();
    }

    // render the scene
    renderer.render(scene, camera);

    // call the loop function again
    requestAnimationFrame(animationLoop);
}