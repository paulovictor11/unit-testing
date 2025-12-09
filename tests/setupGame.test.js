import { describe, it, expect, vi } from "vitest";
import { createCards } from "../src/createCards";
import { setupGame } from "../src/setupGame";

// import the modules to spy on
import * as shuffleModule from "../src/shuffle";
import * as dealModule from "../src/deal";

describe("setupGame", () => {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

    it("should calls shuffle before dealing cards", () => {
        const cards = createCards({ suits, values });
        const shuffleSpy = vi.spyOn(shuffleModule, "shuffle");
        const dealSpy = vi.spyOn(dealModule, "deal");

        setupGame(cards, 5, 3);

        expect(shuffleSpy).toHaveBeenCalledOnce();
        expect(shuffleSpy.mock.invocationCallOrder[0]).toBeLessThan(dealSpy.mock.invocationCallOrder[0]);
    });

    it("should deal with correct arguments", () => {
        const cards = createCards({ suits, values });
        const shuffleSpy = vi.spyOn(shuffleModule, "shuffle");
        const dealSpy = vi.spyOn(dealModule, "deal");

        setupGame(cards, 5, 3);

        // get the shuffled cards that shuffle returned
        const shuffledCards = shuffleSpy.mock.results[0].value;

        expect(dealSpy).toHaveBeenCalledWith(shuffledCards, 5, 3);
    });
});
