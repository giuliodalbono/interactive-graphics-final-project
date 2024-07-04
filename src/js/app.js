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

    renderer.render(scene, camera);
}