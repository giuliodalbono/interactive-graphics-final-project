// Jump logic
let isJumping = false;
let velocity = 0;
const GRAVITY = -0.5;
const JUMP_STRENGTH = 12;
const SPACE_BAR_KEY = 32

function onKeyDown(event) {
    if (event.keyCode === SPACE_BAR_KEY && ! isJumping) {
        isJumping = true;
        velocity = JUMP_STRENGTH;
    }
}

document.addEventListener('keydown', onKeyDown);

// Animation loop
export function animateCube() {
    if (isJumping) {
        cube.mesh.position.y += velocity;
        velocity += GRAVITY;

        // Prevent the cube from falling below the ground (y = 0)
        if (cube.mesh.position.y <= 0) {
            cube.mesh.position.y = 0;
            velocity = 0;
            isJumping = false;
        }
    }
    requestAnimationFrame(animateCube);
}