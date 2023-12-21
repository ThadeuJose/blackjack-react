import { Card, deckOfCards } from "./Card";
import { Store } from "./Store";
import "./tailwind.css";

export default function App() {
  const testDeckOfCards: Card[] = [
    { rank: "A", suit: "heart", hidden: false },
    { rank: "5", suit: "heart", hidden: false },
    { rank: "K", suit: "club", hidden: false },
    { rank: "A", suit: "club", hidden: false },
  ];

  //return <Store deck={testDeckOfCards}></Store>;
  return <Store deck={shuffleDeck(deckOfCards)}></Store>;
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
