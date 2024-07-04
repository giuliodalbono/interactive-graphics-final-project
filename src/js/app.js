/**
 * Main js for application.
 */
import { createScene } from "./scene.js";
import { createLights } from "./light.js";
import { createEarth } from "./model/Earth.js";
import { createSky } from "./model/Sky.js";

window.addEventListener('load', init, false);

function init() {
    // Set up the scene, the camera and the renderer
    createScene();

    // Add the lights
    createLights();

    // Create Sea
    createEarth();

    // Create Sky
    createSky();

    animationLoop();
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

    // render the scene
    renderer.render(scene, camera);

    // call the loop function again
    requestAnimationFrame(animationLoop);
}