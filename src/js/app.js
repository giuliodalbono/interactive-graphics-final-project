/**
 * Main js for application.
 */
import { createScene } from "./scene.js";
import { createLights } from "./light.js";

window.addEventListener('load', init, false);

function init() {
    // Set up the scene, the camera and the renderer
    createScene();

    // Add the lights
    createLights();
}