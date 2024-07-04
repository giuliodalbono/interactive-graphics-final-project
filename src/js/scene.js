import * as THREE from "../../vendors/three.module.js";

let HEIGHT, WIDTH;

export function createScene() {
    // Get the width and the height of the screen, use them to set up the aspect ratio of the camera and the size of the
    // renderer
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    // Create the scene
    window['scene'] = new THREE.Scene();

    // Create the camera
    const ASPECT_RATIO = WIDTH / HEIGHT;
    const FIELD_OF_VIEW = 60;
    const NEAR_PLANE = 1;
    const FAR_PLANE = 10000;
    const camera = new THREE.PerspectiveCamera(
        FIELD_OF_VIEW,
        ASPECT_RATIO,
        NEAR_PLANE,
        FAR_PLANE
    );
    window['camera'] = camera;

    // Set the position of the camera
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({
        // Allow transparency to show the gradient background we defined in the CSS
        alpha: true,

        // Activate the antialiasing; this is less performant, but, as the project is low-poly based, it should be fine
        antialias: true
    });
    window['renderer'] = renderer;

    // Define the size of the renderer; in this case, it will fill the entire screen
    renderer.setSize(WIDTH, HEIGHT);

    // Enable shadow rendering
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add the DOM element of the renderer to the container we created in the HTML
    const container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    // Listen to the screen: if the user resizes it we have to update the camera and the renderer size
    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    // Update height and width of the renderer and the camera
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}