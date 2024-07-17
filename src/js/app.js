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
import { animateCoins, createCoins } from "./model/Coin.js";
import { createPalms, incrementPalmsSpeed } from "./palm.js";

window.addEventListener('load', init, false);

window['lives'] = 3;
window['score'] = 0;
let CLOUD_VELOCITY = 5;
let EARTH_VELOCITY = 0.001;
const statisticsPanel = document.getElementById('statisticsPanel');
const gameOverPanel = document.getElementById('gameOverPanel');

function updateLives() {
    window['lives']--;
    statisticsPanel.innerHTML =
        `Lives: ${window['lives']}<br>
        Score: ${window['score']}`;
}

function showGameOverPanel() {
    gameOverPanel.innerHTML =
        `GAME OVER!<br>
        Score: ${window['score']}`;
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

    // create coins initially and then periodically
    createCoins();

    // Create palm trees
    createPalms();

    // Move the clouds in the sky
    animationLoop();

    // Start the animation loop for coins
    animateCoins();

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

    // Increment speed of earth linearly
    incrementEarthVelocity();

    // Move obstacle
    obstacle.move();

    // Increment speed of obstacles linearly
    obstacle.incrementSpeed();

    // Increment speed of palms linearly
    incrementPalmsSpeed();

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

function incrementEarthVelocity() {
    // Update the ground texture offset to create the moving effect
    earth.mesh.material.map.offset.x += EARTH_VELOCITY;
    if (EARTH_VELOCITY < 0.005) {
        EARTH_VELOCITY += 0.0000003;
    }
}