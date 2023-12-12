import { useState } from "react";
import { Card } from "../../Card";

interface GameProps {
  deckOfCards: Card[];
}

export default function Game({ deckOfCards }: GameProps): JSX.Element {
  let message: string = "Press 'New Game' to begin!";
  let [cards, setCards] = useState<string[]>([]);

  function handleClick() {
    let updatedCards: string[] = [];
    for (let index = 0; index < 4; index++) {
      let card: Card | undefined = deckOfCards.shift();

      if (card) {
        if (index === 3) {
          card.hidden = true;
        }
        updatedCards = [...updatedCards, printCard(card)];
      }
    }

    setCards(updatedCards);
  }

  return (
    <>
      Your hand
      {cards.map((path, index) => (
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
  if (rank === "Q") {
    return "queen";
  }
  if (rank === "J") {
    return "jack";
  }
  if (rank === "K") {
    return "king";
  }
  return rank;
}
