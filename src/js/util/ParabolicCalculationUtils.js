/**
 * Calculates the position of an object on the parabola.
 * @param t parameter which ranges from 0 to 1. 0 means the start of the parable, 1 its end.
 * @param startX
 * @param startY
 * @param peakHeight the height of the parabola at its peak.
 * @param horizontalScaling horizontal scaling factor.
 * @returns {{x: *, y: *}} coordinates on the parable.
 */
export function calculateParabolicPosition(t, startX, startY, peakHeight, horizontalScaling) {
    // Calculate the horizontal position using the horizontal scaling factor
    const x = startX + t * horizontalScaling;

    // Calculate the vertical position using a parabolic equation.
    // The equation -4 * peakHeight * (t * t - t) defines a parabola that starts and ends at y = startY
    // and reaches its peak at t=0.5.
    const y = startY + (-4 * peakHeight * (t * t - t));

    return { x, y };
}

/**
 * Calculates length of an "arc" of the parable where:<br>
 * x = startX + t * horizontalScaling and<br>
 * y = startY + (-4 * peakHeight * (t * t - t)).
 * @param t parameter which ranges from 0 to 1. 0 means the start of the parable, 1 its end.
 * @param peakHeight the height of the parabola at its peak.
 * @param horizontalScaling horizontal scaling factor.
 * @returns {number}
 */
export function calculateArcLength(t, peakHeight, horizontalScaling) {
    const dx = horizontalScaling; // Derivative of the x (just the coefficient of t, -> HORIZONTAL_SCALING)
    const dy = -8 * peakHeight * (t - 0.5); // Derivative of the parabola
    return Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem
}

/**
 * Calculates the total arc length of a parabolic path between two points, using numerical integration.
 * @param tStart starting value of parameter t along the parabola (0).
 * @param tEnd ending value of parameter t along the parabola (1).
 * @param peakHeight the height of the parabola at its peak.
 * @param steps number of steps to use in the numerical integration process.
 * @param horizontalScaling horizontal scaling factor.
 * @returns {number}
 */
export function integrateArcLength(tStart, tEnd, peakHeight, steps, horizontalScaling) {
    let arcLength = 0;
    const stepSize = (tEnd - tStart) / steps;
    for (let i = 0; i < steps; i++) {
        const t = tStart + i * stepSize;
        arcLength += calculateArcLength(t, peakHeight, horizontalScaling) * stepSize;
    }
    return arcLength;
}

/**
 * Generates a series of points that are evenly spaced along a parabolic trajectory.
 * @param startX
 * @param startY
 * @param peakHeight the height of the parabola at its peak.
 * @param numPoints number of points to generate on the parable.
 * @param horizontalScaling horizontal scaling factor.
 * @returns {*[]}
 */
export function generateEquidistantParabolaPoints(startX, startY, peakHeight, numPoints, horizontalScaling) {
    const points = [];
    // Estimate total arc length
    const totalArcLength = integrateArcLength(0, 1, peakHeight, 100, horizontalScaling);

    // Distance between points
    const segmentLength = totalArcLength / (numPoints - 1);
    let currentArcLength = 0;
    let t = 0;

    // First point at t = 0
    points.push(calculateParabolicPosition(0, startX, startY, peakHeight, horizontalScaling));

    for (let i = 1; i < numPoints; i++) {
        while (currentArcLength < segmentLength * i) {
            currentArcLength += calculateArcLength(t, peakHeight, horizontalScaling) * 0.01;
            t += 0.01;
        }
        // When arcLength is greater than segmentLength then add new point at this position
        points.push(calculateParabolicPosition(t, startX, startY, peakHeight, horizontalScaling));
    }
    return points;
}