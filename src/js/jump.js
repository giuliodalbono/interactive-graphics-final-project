// Jump logic
export let isJumping = false; // Flag which indicates if the cube is jumping
let velocity = 0; // Initial velocity of jump
const GRAVITY = -0.5; // Gravity
const JUMP_STRENGTH = 12; // Jump strength
const SPACE_BAR_KEY = 32 // ASCII code for space bar

/**
 * If space bar is pressed, then jump.
 * @param event
 */
function onKeyDown(event) {
    if (event.keyCode === SPACE_BAR_KEY && ! isJumping) {
        isJumping = true;
        velocity = JUMP_STRENGTH;
    }
}

document.addEventListener('keydown', onKeyDown);

/**
 * Cube animation for jump.
 */
export function animateCube() {
    if (isJumping) {
        if (window['bounce']) {
            // If cube is bouncing (after a collision) apply a smaller bounce
            velocity = JUMP_STRENGTH / 3;
            cube.mesh.position.y += velocity;
            window['bounce'] = false;
        } else {
            cube.mesh.position.y += velocity;
            velocity += GRAVITY;
        }

        // Prevent the cube from falling below the ground (y = 0)
        if (cube.mesh.position.y <= 0) {
            cube.mesh.position.y = 0;
            velocity = 0;
            isJumping = false;
        }
    }
    requestAnimationFrame(animateCube);
}