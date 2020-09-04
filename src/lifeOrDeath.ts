/**
 * Applies the rules of the "game of life" to the matrix
 * and returns the new matrix
 */
export function lifeOrDeath(dataMatrix: number[][]) {
    const size = dataMatrix[0].length - 1;

    /**check to see if the row or column coordinate
     * is outside the matrix. If it is,
     * it evaluates to the opposite side of the matrix
     */
    function checkEdge(num: number) {
        if (num < 0) {
            num = size;
        } else if (num > size) {
            num = 0;
        }
        return num;
    }

    /**nextMatrix will be the next state of dataMatrix
    as determined by the rules */
    const nextMatrix = dataMatrix.map((row, i) => {
        return row.map((current, j) => {
            /** sum is the sum of values in the surrounding cells
             * (in clockwise order)
             */
            const sum =
                dataMatrix[checkEdge(i - 1)][j] +
                dataMatrix[checkEdge(i - 1)][checkEdge(j + 1)] +
                dataMatrix[i][checkEdge(j + 1)] +
                dataMatrix[checkEdge(i + 1)][checkEdge(j + 1)] +
                dataMatrix[checkEdge(i + 1)][j] +
                dataMatrix[checkEdge(i + 1)][checkEdge(j - 1)] +
                dataMatrix[i][checkEdge(j - 1)] +
                dataMatrix[checkEdge(i - 1)][checkEdge(j - 1)];

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

    return nextMatrix;
}
