import { Card } from "../../Card";

const startMessage: string = "Press 'New Game' to begin";
const initialHandDealtMessage: string = "The initial hands are dealt";
const winnerMessage: string = "You won";

type Hand = {
  cards: Card[];
  value: number;
};

type Status = "Start" | "IsPlaying" | "Winner";

export type State = {
  message: string;
  deck: Card[];
  playerHand: Hand;
  dealerHand: Hand;
  status: Status;
};

export function init(deck: Card[]): State {
  return {
    message: startMessage,
    deck: [...deck],
    status: "Start",
    playerHand: {
      cards: [],
      value: 0,
    },
    dealerHand: {
      cards: [],
      value: 0,
    },
  };
}

export const NewGameAction: string = "NewGame";
export const HitAction: string = "Hit";

export function reducer(state: State, action: any): State {
  switch (action.type) {
    case NewGameAction: {
      let { deck: updatedDeck, hand: playerHand } = drawPlayerStarterHand(
        state.deck
      );
      let { deck, hand: dealerHand } = drawDealerStarterHand(updatedDeck);

      let message: string = startMessage;
      let status: Status = "IsPlaying";
      if (playerHand.value === 21) {
        message = winnerMessage;
        status = "Winner";
      } else {
        message = initialHandDealtMessage;
      }

      return {
        ...state,
        playerHand,
        dealerHand,
        message,
        status,
        deck,
      };
    }
    case HitAction: {
      if (state.playerHand.value > 21) {
        return state;
      }
      let { deck, hand: playerHand } = draw(state.playerHand, state.deck);
      let message: string = startMessage;
      let status: Status = "IsPlaying";
      if (playerHand.value === 21) {
        message = winnerMessage;
        status = "Winner";
      } else {
        message = initialHandDealtMessage;
      }

      return {
        ...state,
        playerHand,
        deck,
        message,
        status,
      };
    }
    default: {
      return state;
    }
  }
}

function drawPlayerStarterHand(oldDeck: Card[]): { deck: Card[]; hand: Hand } {
  let cards: Card[] = [];
  for (let index = 0; index < 2; index++) {
    let card: Card | undefined = oldDeck[index];
    if (card) {
      cards = [...cards, card];
    }
  }
  let deck: Card[] = oldDeck.slice(2);
  return { deck, hand: { cards, value: calculateHand(cards) } };
}

function drawDealerStarterHand(oldDeck: Card[]): { deck: Card[]; hand: Hand } {
  let cards: Card[] = [];
  for (let index = 0; index < 2; index++) {
    let card: Card | undefined = oldDeck[index];
    if (card) {
      cards = [...cards, card];
    }
  }
  cards[1].hidden = true;
  let deck: Card[] = oldDeck.slice(2);
  return { deck, hand: { cards, value: calculateHand(cards) } };
}

function draw(oldHand: Hand, oldDeck: Card[]): { deck: Card[]; hand: Hand } {
  let cards: Card[] = oldHand.cards;
  let card: Card | undefined = oldDeck[0];
  if (card) {
    cards = [...cards, card];
  }
  let deck: Card[] = oldDeck.slice(1);
  return { deck, hand: { cards, value: calculateHand(cards) } };
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
