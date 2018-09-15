import buildDataset from './algorithm.js';

describe("build dataset from data", () => {
    
    it("build an empty dataset from an empty data", () => {
        expect(buildDataset([])).toEqual([]);
    });

});