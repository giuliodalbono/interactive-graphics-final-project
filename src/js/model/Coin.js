import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";
import { generateEquidistantParabolaPoints } from "../util/ParabolicCalculationUtils.js";

let horizontalScaling = 120; // Horizontal scaling factor, used for distancing the coins as the time passes
let coinVelocity = 2.5; // Initial coin velocity
const statisticsPanel = document.getElementById('statisticsPanel');
const OBSTACLE_DISTANCE_THRESHOLD = 50; // Threshold distance from obstacle to generate coins

/**
 * Updates the statistics panel with new score.
 */
function updateScore() {
    window['score']++;
    statisticsPanel.innerHTML =
        `Lives: ${window['lives']}<br>
        Score: ${window['score']}`;
}

/**
 * Class representing a coin.
 */
class Coin {
    constructor() {
        // Simple cylinder geometry
        const geometry = new THREE.CylinderGeometry(6, 6, 1, 32);

        const material = new THREE.MeshPhongMaterial({ color: Colors.gold });

        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        // Rotate the coin to lay flat
        this.mesh.rotation.x = Math.PI / 2;

        // Set the coin as not collected by default
        this.collected = false;
    }

    /**
     * Animates the coin with the rotation.
     */
    animateCoin() {
        this.mesh.rotation.z += 0.05
    }

    /**
     * Animation responsible for coin fading after collection.
     */
    disappearAnimation() {
        const scaleDown = () => {
            if (this.mesh.scale.x > 0) {
                this.mesh.scale.x -= 0.05;
                this.mesh.scale.y -= 0.05;
                this.mesh.scale.z -= 0.05;
                requestAnimationFrame(scaleDown);
            }
        };
        scaleDown();
    }

    /**
     * Validator of coin position.
     * @returns {boolean} Returns:<br>
     * - True if coin distance from the next obstacle is at least as OBSTACLE_DISTANCE_THRESHOLD.
     * - False otherwise.
     */
    isCoinPositionValid() {
        const distance = this.mesh.position.distanceTo(window['obstacle'].mesh.position);
        return distance >= OBSTACLE_DISTANCE_THRESHOLD;
    }
}

/**
 * Increments speed and horizontal scaling, until the cap of coin velocity is reached (7.5).
 */
function incrementSpeed() {
    if (coinVelocity < 7.5) {
        coinVelocity += 0.001;
        horizontalScaling += 0.05;
    }
}

const coins = []; // Array of coins to display
const COIN_NUMBER = 10; // Number of coins to display
const START_X = 600;
const START_Y = 10; // Ground level
const START_Z = -50;
const SPACING = 100; // Spacing between coins
const PEAK_HEIGHT = 120; // Maximum height reachable for coins when placed as a parable

/**
 * Creates the coin. There are 4 possible layouts:<br>
 * - Line on the ground: coins are positioned one after another, forming a straight line;
 * - Parabolic: coins are positioned as a parable;
 * - Mixed v1 - line + parabolic: first half of coins are positioned as a straight line, second half as a parable;
 * - Mixed v2 - parabolic + line: first half of coins are position as a parable, second half as a straight line.
 */
export function createCoins() {
    // 0: line on the ground, 1: parabolic, 2: mixed v1, 3: mixed v2
    const patternType = Math.floor(Math.random() * 4);

    switch(patternType) {
        case 0:
            createCoinsInLine(COIN_NUMBER, START_X);
            break;
        case 1:
            createCoinsInParable(COIN_NUMBER, START_X);
            break;
        case 2:
            createCoinsMixedLinearAndParabolic();
            break;
        case 3:
            createCoinsMixedParabolicAndLinear();
            break;
    }
}

/**
 * Given position coordinates, creates and adds to the scene a new coin if the position is valid.
 * @param x X coordinate.
 * @param y Y coordinate.
 * @param z Z coordinate.
 * @see isCoinPositionValid
 */
function createAndAddCoinToTheScene(x, y, z) {
    const coin = new Coin();
    coin.mesh.position.set(x, y, z);
    if (coin.isCoinPositionValid()) {
        coins.push(coin);
        scene.add(coin.mesh);
    }
}

/**
 * Creates the coin with straight line layout.
 * @param coinNumber Number of coin to create with this layout.
 * @param startX Starting x coordinate to use.
 */
function createCoinsInLine(coinNumber, startX) {
    for (let i = 0; i < coinNumber; i++) {
        createAndAddCoinToTheScene(startX + i * SPACING, START_Y, START_Z);
    }
}

/**
 * Creates the coin with parable layout.
 * @param coinNumber Number of coin to create with this layout.
 * @param startX Starting x coordinate to use.
 * @return x coordinate of last coin in the parable
 */
function createCoinsInParable(coinNumber, startX) {
    // Calculating points where to create the coins in order to have a parabolic layout (only needed for x and y)
    const parabolicPoints = generateEquidistantParabolaPoints(startX, START_Y, PEAK_HEIGHT, coinNumber, horizontalScaling);
    for (let i = 0; i < coinNumber; i++) {
        createAndAddCoinToTheScene(parabolicPoints[i].x, parabolicPoints[i].y, START_Z);
    }

    // Find the x coordinate of the last coin in the parable and return it
    return parabolicPoints[coinNumber - 1].x;
}

/**
 * Creates the coin with the mixed v1 layout.
 */
function createCoinsMixedLinearAndParabolic() {
    createCoinsInLine(COIN_NUMBER / 2, START_X);
    createCoinsInParable(COIN_NUMBER / 2, START_X + COIN_NUMBER / 2 * SPACING);
}

/**
 * Creates the coin with the mixed v2 layout.
 */
function createCoinsMixedParabolicAndLinear() {
    // Last coin's x coordinate is needed to give it as input for the function responsible to create coins in straight line
    let lastParabolicX = createCoinsInParable(COIN_NUMBER / 2, START_X);
    createCoinsInLine(COIN_NUMBER / 2, lastParabolicX + SPACING);
}

/**
 * Function responsible for coin animations:<br>
 * - Coin rotation;
 * - Coin movement;
 * - Coin displacement after it exits from camera;
 * - Coin fading in case of collision with the cube;
 */
export function animateCoins() {
    // Keep animating until the game is over
    if (window['lives'] !== 0) {
        requestAnimationFrame(animateCoins);
    }

    // Rotate all coins
    for (const coin of coins) {
        coin.animateCoin();
    }

    // Move coins and check if they need to be repositioned
    for (let i = 0; i < coins.length; i++) {
        coins[i].mesh.position.x -= coinVelocity;
        if (coins[i].mesh.position.x < -600) {
            scene.remove(coins[i].mesh);
            coins.splice(i, 1);
        } else if (cube.checkCollision(coins[i])) {
            coins[i].disappearAnimation();
            cube.earnedCoinAnimation();
            if (coins[i].collected === false) {
                updateScore();
                coins[i].collected = true;
            }
        }
    }

    incrementSpeed();

    // Periodically generate new chunks of coins (after all coins have exited from the scene)
    if (coins.length === 0) {
        createCoins();
    }

    renderer.render(scene, camera);
}