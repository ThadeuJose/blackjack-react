import Hand from "../Hand/Hand";
import "./Game.css";
import { HitAction, NewGameAction, State } from "./Redux";

interface GameProps {
  dispatch: React.Dispatch<any>;
  state: State;
}

export default function Game({ dispatch, state }: GameProps): JSX.Element {
  function handleNewGameButtonClick() {
    dispatch({ type: NewGameAction });
  }

  function handleHitButtonClick() {
    dispatch({ type: HitAction });
  }

  function Panel(): JSX.Element {
    if (state.status === "Start" || state.status === "Winner") {
      return (
        <div className='buttonbox'>
          <button
            data-cy='NewGameButton'
            onClick={() => handleNewGameButtonClick()}
          >
            New Game
          </button>
        </div>
      );
    }
    return (
      <div className='buttonbox'>
        <button data-cy='HitButton' onClick={handleHitButtonClick}>
          Hit
        </button>
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
          cards={state.dealerHand.cards}
          value={state.dealerHand.value}
        />
        <Hand
          title={"Player's hand"}
          data_cy='playerHandValue'
          cards={state.playerHand.cards}
          value={state.playerHand.value}
        />
      </div>
      <div className='control-box'>
        <div className='textupdates' data-cy='status'>
          {state.message}
        </div>
        {Panel()}
      </div>
    </div>
  );
}
