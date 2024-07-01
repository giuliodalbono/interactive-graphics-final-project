/**
 * Main js for application.
 */
import { createScene } from "./scene.js";

window.addEventListener('load', init, false);

function init() {
    // Set up the scene, the camera and the renderer
    createScene();
}