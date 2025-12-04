import { describe, it, expect } from "vitest";
import { loadDeck } from "../src/loadDeck";

describe("loadCheck", () => {
    it("should return a Promise that resolves", async () => {
        const result = loadDeck();
        expect(result).toBeInstanceOf(Promise);
        await expect(result).resolves.toBeDefined();
    });

    it("should resolves a { suits[4], values[13] } deck", async () => {
        const deck = await loadDeck();

        expect(deck).toEqual(
            expect.objectContaining({
                suits: expect.any(Array),
                values: expect.any(Array),
            })
        );

        expect(deck.suits).toHaveLength(4);
        expect(deck.values).toHaveLength(13);
    });

    it('should supports another id, e.g. "pokemon"', async () => {
        const deck = await loadDeck("pokemon");
        expect(deck.suits).toHaveLength(4);
        expect(deck.values).toHaveLength(13);
    });

    it("should rejects with an error for unknown ids", async () => {
        const deck = loadDeck("unknown");
        await expect(deck).rejects.toThrow(/not found/i);
    });
});
