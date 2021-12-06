import { lifeOrDeath, mayBeTransport, Matrix } from "../lifeOrDeath";

describe("mayBeTransport", () => {
    it("should return a number that is within a size limit", () => {
        let value = 10;
        let size = 9;
        let result = mayBeTransport(value, size);
        expect(result).toBe(0);
        value = -1;
        size = 9;
        result = mayBeTransport(value, size);
        expect(result).toBe(9);
        value = 5;
        size = 9;
        result = mayBeTransport(value, size);
        expect(result).toBe(5);
        value = 0;
        size = 9;
        result = mayBeTransport(value, size);
        expect(result).toBe(0);
        value = 9;
        size = 9;
        result = mayBeTransport(value, size);
        expect(result).toBe(9);
    });
});

describe("lifeOrDeath", () => {
    it("should update the matrix according to the rule of game of life", () => {
        const matrix: Matrix = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
        ];
        const nextMatrix = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];
        const result = lifeOrDeath(matrix);
        expect(result).toEqual(nextMatrix);
    });
});
