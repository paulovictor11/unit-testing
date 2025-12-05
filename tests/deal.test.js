import { describe, it, expect, vi } from "vitest";
import { createCards } from "../src/createCards";
import { deal } from "../src/deal";
import { logDealRound } from "../src/helpers/loggers";

vi.mock("../src/helpers/loggers", async () => {
    const originals = await vi.importActual("../src/helpers/loggers");
    return {
        ...originals,
        logDealRound: vi.fn(() => {
            console.log("logDealRound mock fn");
            return true;
        }),
    };
});

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

    it("should calls the logger a correct number of times", () => {
        const cards = createCards({ suits, values });
        logDealRound.mockClear();
        deal(cards, 5, 3);
        expect(logDealRound).toHaveBeenCalledTimes(5);
        expect(logDealRound).toHaveReturnedWith(true);
    });
});
