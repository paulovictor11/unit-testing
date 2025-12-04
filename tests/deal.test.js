import { describe, it, expect } from "vitest";
import { createCards } from "../src/createCards";
import { deal } from "../src/deal";

describe("deal", () => {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

    it("should deals the correct number of hands", () => {
        const cards = createCards({ suits, values });
        const deals = deal(cards, 2, 6);
        expect(deals).toHaveLength(6);
    });

    it("should deals each hand the correct number of cards", () => {
        const cards = createCards({ suits, values });
        const deals = deal(cards, 2, 6);
        deals.forEach((deal) => expect(deal).toHaveLength(2));
    });

    it("shoudl throws an error when the array of cards are empty", () => {
        expect(() => deal([], 2, 6)).toThrow(/enough/);
    });
});
