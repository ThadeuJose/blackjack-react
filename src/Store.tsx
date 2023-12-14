import { useReducer } from "react";
import { Card } from "./Card";
import Game from "./components/Game/Game";
import { reducer, init } from "./components/Game/Redux";

interface StoreProps {
  deck: Card[];
}

export function Store({ deck }: StoreProps) {
  let [state, dispatch] = useReducer(reducer, deck, init);

  return (
    <main>
      <Game state={state} dispatch={dispatch} />
    </main>
  );
}
