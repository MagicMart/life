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
            /** sum is the sum of values in the surrounding cells
             * (in clockwise order)
             */
            const sum =
                dataMatrix[mayBeTransport(i - 1, size)][j] +
                dataMatrix[mayBeTransport(i - 1, size)][
                    mayBeTransport(j + 1, size)
                ] +
                dataMatrix[i][mayBeTransport(j + 1, size)] +
                dataMatrix[mayBeTransport(i + 1, size)][
                    mayBeTransport(j + 1, size)
                ] +
                dataMatrix[mayBeTransport(i + 1, size)][j] +
                dataMatrix[mayBeTransport(i + 1, size)][
                    mayBeTransport(j - 1, size)
                ] +
                dataMatrix[i][mayBeTransport(j - 1, size)] +
                dataMatrix[mayBeTransport(i - 1, size)][
                    mayBeTransport(j - 1, size)
                ];

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
