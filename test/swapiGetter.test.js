import swapiGettering from "./swapiGetter.js";

describe('swapiGetter', () => {
    test('should return a name', () => {
        const result = swapiGetter()
        console.log(result)
        expect(result).toBe("Luke Skywalker");
    });
});
