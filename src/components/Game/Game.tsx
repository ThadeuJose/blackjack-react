import { useState } from "react";
import { Card } from "../../Card";

interface GameProps {
  deckOfCards: Card[];
}

export default function Game({ deckOfCards }: GameProps): JSX.Element {
  let message: string = "Press 'New Game' to begin!";
  let [playerHandValue, setPlayerHandValue] = useState<number>(0);
  let [playerCards, setPlayerCards] = useState<string[]>([]);

  let [dealerHandValue, setDealerHandValue] = useState<number>(0);
  let [dealerCards, setDealerCards] = useState<string[]>([]);

  function handleClick() {
    let playerHand: Card[] = getHand(deckOfCards);
    setPlayerHandValue(calculateHand(playerHand));
    setPlayerCards(playerHand.map((card) => printCard(card)));

    let dealerHand: Card[] = getHand(deckOfCards);
    dealerHand[1].hidden = true;
    setDealerHandValue(calculateHand(dealerHand));
    setDealerCards(dealerHand.map((card) => printCard(card)));
  }

  return (
    <>
      Your hand <span data-cy='playerHandValue'>{playerHandValue}</span>
      {playerCards.map((path, index) => (
        <img key={index} src={path} />
      ))}
      Dealer hand <span data-cy='dealerHandValue'>{dealerHandValue}</span>
      {dealerCards.map((path, index) => (
        <img key={index} src={path} />
      ))}
      <div className='textupdates' id='textUpdates'>
        {message}
      </div>
      <div className='buttonbox' id='newgame'>
        <button id='play' data-cy='NewGameButton' onClick={handleClick}>
          New Game
        </button>
      </div>
      <div className='buttonbox hidden' id='buttonBox'>
        <button id='hit'>Hit</button>
        <button id='stay'>Stay</button>
      </div>
    </>
  );
}

function getHand(deckOfCards: Card[]) {
  let playerHand: Card[] = [];
  for (let index = 0; index < 2; index++) {
    let card: Card | undefined = deckOfCards.shift();

    if (card) {
      playerHand = [...playerHand, card];
    }
  }
  return playerHand;
}

export function printCard(card: Card): string {
  if (card.hidden) {
    return "images/back.png";
  }
  return `images/${card.suit}_${printRank(card.rank)}.png`;
}

function printRank(rank: string): string {
  if (rank === "A") {
    return "1";
  }
  if (rank === "J") {
    return "jack";
  }
  if (rank === "Q") {
    return "queen";
  }
  if (rank === "K") {
    return "king";
  }
  return rank;
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
