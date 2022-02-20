export type DeadOrAlive = 0 | 1
export type Matrix = DeadOrAlive[][];

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
export function lifeOrDeath(matrix: Matrix): Matrix {
    const size = matrix[0].length - 1;
    return matrix.map((row, i): DeadOrAlive[] =>
        row.map((current, j): DeadOrAlive => {
            const sum = sumSurroundingCells(matrix, [i, j], size);
            return applyTheRules(sum, current);
        })
    );
}

/**
 * Sums the surrounding cells of the current cell
 */
export function sumSurroundingCells(
    dataMatrix: Matrix,
    [i, j]: [number, number],
    size: number
) {
    let sum = 0;
    sum += dataMatrix[mayBeTransport(i - 1, size)][j];
    sum += dataMatrix[mayBeTransport(i - 1, size)][mayBeTransport(j + 1, size)];
    sum += dataMatrix[i][mayBeTransport(j + 1, size)];
    sum += dataMatrix[mayBeTransport(i + 1, size)][mayBeTransport(j + 1, size)];
    sum += dataMatrix[mayBeTransport(i + 1, size)][j];
    sum += dataMatrix[mayBeTransport(i + 1, size)][mayBeTransport(j - 1, size)];
    sum += dataMatrix[i][mayBeTransport(j - 1, size)];
    sum += dataMatrix[mayBeTransport(i - 1, size)][mayBeTransport(j - 1, size)];
    return sum;
}

/**
 * Applies the rules of the "game of life" to the current cell
 * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 */
export function applyTheRules(sum: number, current: DeadOrAlive): DeadOrAlive {
    if (sum === 3) {
        return 1;
    } else if (sum === 2) {
        return current;
    } else {
        return 0;
    }
}
