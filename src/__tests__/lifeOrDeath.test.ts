import { mayBeTransport } from "../lifeOrDeath";

describe("lifeOrDeath > mayBeTransport", () => {
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
