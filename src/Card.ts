export type Card = {
  rank: string;
  suit: string;
  hidden: boolean;
};

const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const suits = ["heart", "diamond", "club", "spade"];

export const deckOfCards: Card[] = [];

for (const suit of suits) {
  for (const rank of ranks) {
    deckOfCards.push({ rank, suit, hidden: false });
  }
}
