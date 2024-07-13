import * as THREE from "../../../vendors/three.module.js";
import { Colors } from "../color.js";
import { generateEquidistantParabolaPoints } from "../util/ParabolicCalculationUtils.js";

let horizontalScaling = 120;
let coinVelocity = 2.5;
const statisticsPanel = document.getElementById('statisticsPanel');

function updateScore() {
    window['score']++;
    statisticsPanel.innerHTML =
        `Lives: ${window['lives']}<br>
        Score: ${window['score']}`;
}

class Coin {
    constructor() {
        const geometry = new THREE.CylinderGeometry(6, 6, 1, 32);
        const material = new THREE.MeshPhongMaterial({ color: Colors.gold });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        // Rotate the coin to lay flat initially
        this.mesh.rotation.x = Math.PI / 2;

        this.collected = false;
    }

    animateCoin() {
        this.mesh.rotation.z += 0.05
    }

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
}

function incrementSpeed() {
    if (coinVelocity < 7.5) {
        coinVelocity += 0.001;
        horizontalScaling += 0.05;
    }
}

const coins = [];
const COIN_NUMBER = 10;
const START_X = 600;
const START_Y = 10; // ground level
const START_Z = -50;
const SPACING = 100;
const PEAK_HEIGHT = 120;

export function createCoins() {
    // 0: line on the ground, 1: parabolic, 2: mixed v1 (line + parabolic), 3: mixed v2 (parabolic + line)
    const patternType = Math.floor(Math.random() * 4);

    switch(patternType) {
        case 0: // line on the ground pattern
            createCoinsInLine(COIN_NUMBER, START_X);
            break;
        case 1: // parabolic pattern
            createCoinsInParable(COIN_NUMBER, START_X);
            break;
        case 2: // mixed pattern v1
            createCoinsMixedLinearAndParabolic();
            break;
        case 3: // mixed pattern v2
            createCoinsMixedParabolicAndLinear();
            break;
    }
}

function createCoinsInLine(coinNumber, startX) {
    for (let i = 0; i < coinNumber; i++) {
        const coin = new Coin();
        coin.mesh.position.set(startX + i * SPACING, START_Y, START_Z);
        coins.push(coin);
        scene.add(coin.mesh);
    }
}

function createCoinsInParable(coinNumber, startX) {
    const parabolicPoints = generateEquidistantParabolaPoints(startX, START_Y, PEAK_HEIGHT, coinNumber, horizontalScaling);
    for (let i = 0; i < coinNumber; i++) {
        const coin = new Coin();
        coin.mesh.position.set(parabolicPoints[i].x, parabolicPoints[i].y, START_Z);
        coins.push(coin);
        scene.add(coin.mesh);
    }
    // Find the x-coordinate of the last coin in the parabola and return it
    return parabolicPoints[coinNumber - 1].x;
}

function createCoinsMixedLinearAndParabolic() {
    createCoinsInLine(COIN_NUMBER / 2, START_X);
    createCoinsInParable(COIN_NUMBER / 2, START_X + COIN_NUMBER / 2 * SPACING);
}

function createCoinsMixedParabolicAndLinear() {
    let lastParabolicX = createCoinsInParable(COIN_NUMBER / 2, START_X);
    createCoinsInLine(COIN_NUMBER / 2, lastParabolicX + SPACING);
}

export function animateCoins() {
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