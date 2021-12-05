export type Matrix = (0 | 1)[][];

/**check to see if the row or column coordinate
 * is outside the matrix. If it is,
 * it evaluates to the opposite side of the matrix
 */
export function mayBeTransport(coord: number, size: number): number {
    if (coord < 0) return size;

    if (coord > size) return 0;

    return coord;
}

/**
 * Applies the rules of the "game of life" to the current matrix
 * and returns the new matrix
 */
export function lifeOrDeath(dataMatrix: Matrix): Matrix {
    const size = dataMatrix[0].length - 1;

    /**nextMatrix will be the next state of dataMatrix
    as determined by the rules */
    return dataMatrix.map((row, i): (0 | 1)[] => {
        return row.map((current, j): 0 | 1 => {
            const sum = sumSurroundingCells(dataMatrix, [i, j], size);

            // apply the rules of the Conway's game of life.
            // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
            if (sum === 3) {
                return 1;
            } else if (sum === 2) {
                return current;
            } else {
                return 0;
            }
        });
    });
}

/** sum is the sum of values in the surrounding cells
 * (in clockwise order)
 */
export function sumSurroundingCells(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
) {
    return (
        getTop(dataMatrix, [i, j], size) +
        getTopRight(dataMatrix, [i, j], size) +
        getRight(dataMatrix, [i, j], size) +
        getBottomRight(dataMatrix, [i, j], size) +
        getBottom(dataMatrix, [i, j], size) +
        getBottomLeft(dataMatrix, [i, j], size) +
        getLeft(dataMatrix, [i, j], size) +
        getTopLeft(dataMatrix, [i, j], size)
    );
}

export function getTop(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
): number {
    return dataMatrix[mayBeTransport(i - 1, size)][j];
}

export function getTopRight(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
): number {
    return dataMatrix[mayBeTransport(i - 1, size)][mayBeTransport(j + 1, size)];
}

export function getRight(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
): number {
    return dataMatrix[i][mayBeTransport(j + 1, size)];
}

export function getBottomRight(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
): number {
    return dataMatrix[mayBeTransport(i + 1, size)][mayBeTransport(j + 1, size)];
}

export function getBottom(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
): number {
    return dataMatrix[mayBeTransport(i + 1, size)][j];
}

export function getBottomLeft(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
): number {
    return dataMatrix[mayBeTransport(i + 1, size)][mayBeTransport(j - 1, size)];
}

export function getLeft(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
): number {
    return dataMatrix[i][mayBeTransport(j - 1, size)];
}

export function getTopLeft(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
): number {
    return dataMatrix[mayBeTransport(i - 1, size)][mayBeTransport(j - 1, size)];
}
