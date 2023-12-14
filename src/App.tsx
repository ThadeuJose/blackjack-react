import { Card } from "./Card";
import Game from "./components/Game/Game";

export default function App() {
  const testDeckOfCards: Card[] = [
    { rank: "2", suit: "heart", hidden: false },
    { rank: "3", suit: "heart", hidden: false },
    { rank: "K", suit: "club", hidden: false },
    { rank: "A", suit: "club", hidden: false },
    { rank: "5", suit: "club", hidden: false },
    { rank: "A", suit: "club", hidden: false },
    { rank: "10", suit: "heart", hidden: false },
    { rank: "10", suit: "spade", hidden: false },
  ];

  return (
    <main>
      <Game deckOfCards={testDeckOfCards} />
    </main>
  );
}

function shuffleDeck(deck: any) {
  const shuffledDeck = [...deck];
  // Shuffle the deck using some algorithm (e.g., Fisher-Yates shuffle)
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}
