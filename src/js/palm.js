import { OBJLoader } from "../../vendors/OBJLoader.js";
import * as THREE from "../../vendors/three.module.js";

const N_PALMS = 5;
let palmVelocity = 2.5;
let palms = [];

function createPalm() {
    const objectLoader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();
    const palmTexture = textureLoader.load('resources/data/model/palm-texture.png')

    objectLoader.load(
        'resources/data/model/palm.obj',
        function (obj) {
            obj.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material = new THREE.MeshPhongMaterial({ map: palmTexture });
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            const palm = obj.clone();
            positionPalmRandomly(palm);
            palms.push(palm);
            scene.add(palm);
        }
    );
}

export function createPalms() {
    for (let i = 0; i < N_PALMS; i++) {
        createPalm();
    }
    // Move palms
    movePalms();
}

export function movePalms() {
    if (window['lives'] !== 0) {
        requestAnimationFrame(movePalms);
    }
    for (const palm of palms) {
        movePalm(palm);
    }
}

function movePalm(palm) {
    palm.position.x -= palmVelocity;
    if (palm.position.x < -600) {
        resetPalmPosition(palm);
    }
}

function resetPalmPosition(palm) {
    const zDistanceFactor = Math.random();
    const x = 500 + Math.random() * 150;
    const z = -180 - zDistanceFactor * 60;
    const scale = 6 + 4 * (1 - zDistanceFactor);

    palm.scale.set(scale, scale, scale);
    palm.position.set(x, 0, z);
}

function positionPalmRandomly(palm) {
    const zDistanceFactor = Math.random();
    const x = Math.random() * 600 - Math.random() * 600;
    const z = -180 - zDistanceFactor * 60;
    const scale = 6 + 4 * (1 - zDistanceFactor);

    palm.scale.set(scale, scale, scale);
    palm.position.set(x, 0, z);

    // Add random rotation around the Y-axis, angle between 0 and 2PI
    palm.rotation.y = Math.random() * 2 * Math.PI;
}

export function incrementPalmsSpeed() {
    if (palmVelocity < 7.5) {
        palmVelocity += 0.001;
    }
}