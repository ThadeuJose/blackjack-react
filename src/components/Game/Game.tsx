import { useState } from "react";
import { Card } from "../../Card";
import Hand from "../Hand/Hand";
import useHand from "../Hand/useHand";
import "./Game.css";

interface GameProps {
  deckOfCards: Card[];
}

export default function Game({ deckOfCards }: GameProps): JSX.Element {
  let message: string = "Press 'New Game' to begin!";

  let { add: addPlayer, value: valuePlayer, cards: cardsPlayer } = useHand();
  let { add: addDealer, value: valueDealer, cards: cardsDealer } = useHand();

  const start = "Start";
  const playing = "IsPlaying";
  let [gameState, setGameState] = useState<string>(start);

  function handleClick() {
    let playerHand: Card[] = getPlayerHand(deckOfCards);
    addPlayer(playerHand[0]);
    addPlayer(playerHand[1]);

    let dealerHand: Card[] = getDealerHand(deckOfCards);
    addDealer(dealerHand[0]);
    addDealer(dealerHand[1]);

    setGameState(playing);
  }

  function Panel(): JSX.Element {
    if (gameState === start) {
      return (
        <div className='buttonbox'>
          <button id='play' data-cy='NewGameButton' onClick={handleClick}>
            New Game
          </button>
        </div>
      );
    }
    return (
      <div className='buttonbox'>
        <button data-cy='HitButton'>Hit</button>
        <button data-cy='StayButton'>Stay</button>
      </div>
    );
  }

  return (
    <div className='game-container'>
      <div className='hands-box'>
        <Hand
          title={"Dealer's hand"}
          data_cy='dealerHandValue'
          cards={cardsDealer}
          value={valueDealer}
        />
        <Hand
          title={"Player's hand"}
          data_cy='playerHandValue'
          cards={cardsPlayer}
          value={valuePlayer}
        />
      </div>
      <div className='control-box'>
        <div className='textupdates'>{message}</div>
        {Panel()}
      </div>
    </div>
  );
}

function getDealerHand(deckOfCards: Card[]) {
  let dealerHand: Card[] = getPlayerHand(deckOfCards);
  dealerHand[1].hidden = true;
  return dealerHand;
}

function getPlayerHand(deckOfCards: Card[]) {
  let playerHand: Card[] = [];
  for (let index = 0; index < 2; index++) {
    let card: Card | undefined = deckOfCards.shift();

    if (card) {
      playerHand = [...playerHand, card];
    }
  }
  return playerHand;
}
