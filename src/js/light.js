import * as THREE from "../../vendors/three.module.js";
import { Colors } from "./color.js";

export function createLights() {
    // A hemisphere light is a gradient colored light;
    // the first parameter is the sky color,
    // the second parameter is the ground color,
    // the third parameter is the intensity of the light
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, Colors.brown, .9)

    // A directional light shines from a specific direction.
    // It acts like the sun, that means that all the rays produced are parallel
    const shadowLight = new THREE.DirectionalLight(0xffffff, 4);

    // Set the direction of the light
    shadowLight.position.set(150, 350, 350);

    // Allow shadow casting
    shadowLight.castShadow = true;

    // Define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -600;
    shadowLight.shadow.camera.right = 600;
    shadowLight.shadow.camera.top = 600;
    shadowLight.shadow.camera.bottom = -600;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // Define the resolution of the shadow; the higher, the better, but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 1024;
    shadowLight.shadow.mapSize.height = 1024;

    // To activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}