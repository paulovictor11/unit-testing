import { shuffle } from "./shuffle";
import { deal } from "./deal";

export function setupGame(cards, handSize, numberOfPlayers) {
    const shuffledCards = shuffle(cards);
    const hands = deal(shuffledCards, handSize, numberOfPlayers);

    const players = hands.map((hand, index) => ({
        id: index + 1,
        hand: hand,
        currentTurn: index === 0, // true for first player, false for others
    }));

    return players;
}
