import Hand from "../Hand/Hand";
import { HitAction, NewGameAction, State, StayAction } from "./Redux";

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

  function handleStayButtonClick() {
    dispatch({ type: StayAction });
  }

  function Panel(): JSX.Element {
    if (state.status !== "IsPlaying") {
      return (
        <div className='flex w-fit mx-auto'>
          <button
            className=' bg-green-600 w-fit h-fit p-2 px-4 rounded font-semibold'
            data-cy='NewGameButton'
            onClick={() => handleNewGameButtonClick()}
          >
            New Game
          </button>
        </div>
      );
    }
    return (
      <div className='flex gap-2 w-fit mx-auto'>
        <button
          className='bg-green-600 w-fit h-fit p-2 px-4 rounded font-semibold'
          data-cy='HitButton'
          onClick={handleHitButtonClick}
        >
          Hit
        </button>
        <button
          className='bg-red-600 w-fit h-fit p-2 px-4 rounded font-semibold'
          data-cy='StayButton'
          onClick={handleStayButtonClick}
        >
          Stay
        </button>
      </div>
    );
  }

  return (
    <div className='h-screen w-80vw mx-auto'>
      <div className='h-70vh pt-3'>
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
      <div className='h-30vh'>
        <div className=''>
          <div
            className='mx-auto p-6 my-4 rounded-lg text-center font-semibold bg-gray-600'
            data-cy='status'
          >
            {state.message}
          </div>
        </div>
        <div className=''>{Panel()}</div>
      </div>
    </div>
  );
}
