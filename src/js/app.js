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

window['lives'] = 3;
let CLOUD_VELOCITY = 5;
const statisticsPanel = document.getElementById('statisticsPanel');
const gameOverPanel = document.getElementById('gameOverPanel');

function updateLives() {
    window['lives']--;
    statisticsPanel.textContent = `Lives: ${window['lives']}`;
}

function showGameOverPanel() {
    gameOverPanel.style.display = 'block';
}

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
        cloud.position.x -= CLOUD_VELOCITY;

        // Recycle the cloud if it exits from the scene
        if (cloud.position.x < -((sky.nClouds / 2) * sky.horizontalSpacing)) {
            cloud.position.x += sky.nClouds * sky.horizontalSpacing;
        }
    });

    // Increment speed of clouds linearly
    incrementCloudVelocity();

    // Move obstacle
    obstacle.move();

    // Increment speed of obstacles linearly
    obstacle.incrementSpeed();

    // Check for collision with the cube
    if (cube.checkCollision(obstacle)) {
        if (! obstacle.alreadyCollided) {
            if (window['lives'] > 1) {
                cube.reduceCube();
                obstacle.alreadyCollided = true;
            }
            updateLives();
        }
        cube.animateCollision();
        obstacle.animateCrash();
    }

    // Render the scene
    renderer.render(scene, camera);

    // Call the loop function again if player still has lives
    if (window['lives'] !== 0) {
        requestAnimationFrame(animationLoop);
    } else {
        showGameOverPanel();
        console.log("Oh no, it seems like you lost the game!");
    }
}

function incrementCloudVelocity() {
    if (CLOUD_VELOCITY < 25) {
        CLOUD_VELOCITY += 0.0015;
    }
}