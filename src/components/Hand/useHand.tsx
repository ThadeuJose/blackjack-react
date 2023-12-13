import { useState } from "react";
import { Card } from "../../Card";

export default function useHand() {
  let [value, setValue] = useState<number>(0);
  let [cards, setCards] = useState<Card[]>([]);
  let temporaryCards: Card[] = [];

  function add(card: Card): void {
    temporaryCards = [...temporaryCards, card];
    setValue(calculateHand(temporaryCards));
    setCards(temporaryCards);
  }

  return {
    add,
    value,
    cards,
  };
}

export function calculateHand(hand: Card[]): number {
  let total: number = hand
    .filter((card) => !card.hidden)
    .map((card) => calculateValue(card.rank))
    .reduce((accumulator, value) => accumulator + value, 0);
  if (total >= 21) {
    return total;
  }
  let aceAmount = hand.filter(
    (card) => card.rank === "A" && !card.hidden
  ).length;
  for (let index = 0; index < aceAmount; index++) {
    total += 10;
    if (total >= 21) {
      return total;
    }
  }
  return total;
}
function calculateValue(rank: string): number {
  if (rank === "A") {
    return 1;
  }
  if (rank === "J" || rank === "Q" || rank === "K") {
    return 10;
  }
  return Number(rank);
}
