import { describe, it, expect } from "vitest";
import { createCards } from "../src/createCards";
import { shuffle } from "../src/shuffle";

describe("shuffle", () => {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

    it("should randomizes the order of an array of cards", () => {
        const cards = createCards({ suits, values });
        const shuffled = shuffle(cards);
        expect(shuffled).not.toEqual(cards);
    });

    it("should does not change the length of the array", () => {
        const cards = createCards({ suits, values });
        const shuffled = shuffle(cards);
        expect(shuffled).toHaveLength(cards.length);
    });
});
