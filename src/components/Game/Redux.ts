import { Card } from "../../Card";

const startMessage: string = "Press 'New Game' to begin";
const initialHandDealtMessage: string = "The initial hands are dealt";
const winnerMessage: string = "You won";
const lostMessage: string = "You lost";

export type Hand = {
  cards: Card[];
  value: number;
};

export type Status = "Start" | "IsPlaying" | "Win" | "Lost";

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
export const StayAction: string = "Stay";

export function reducer(state: State, action: any): State {
  switch (action.type) {
    case NewGameAction: {
      let { deck: updatedDeck, hand: playerHand } = drawPlayerStarterHand(
        state.deck
      );
      let { deck, hand: dealerHand } = drawDealerStarterHand(updatedDeck);

      let message: string = initialHandDealtMessage;
      let status: Status = "IsPlaying";

      if (playerHand.value === 21) {
        message = winnerMessage;
        status = "Win";
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
      let message: string = initialHandDealtMessage;
      let status: Status = "IsPlaying";

      if (playerHand.value === 21) {
        message = winnerMessage;
        status = "Win";
      }
      if (playerHand.value > 21) {
        message = lostMessage;
        status = "Lost";
      }

      return {
        ...state,
        playerHand,
        deck,
        message,
        status,
      };
    }
    case StayAction: {
      let message: string = startMessage;
      let status: Status = "IsPlaying";

      let dealerHand: Hand = { cards: [], value: 0 };
      dealerHand.cards = [...state.dealerHand.cards];
      dealerHand.cards[1].hidden = false;
      dealerHand.value = calculateHand(dealerHand.cards);

      if (dealerHand.value <= 17) {
        let oldDeck: Card[] = state.deck;
        while (dealerHand.value < 21) {
          let { deck, hand } = draw(dealerHand, oldDeck);
          dealerHand = hand;
          oldDeck = deck;
        }
      }
      if (dealerHand.value > 21) {
        message = winnerMessage;
        status = "Win";
      }

      if (dealerHand.value === 21) {
        message = lostMessage;
        status = "Lost";
      }

      return {
        ...state,
        message,
        dealerHand,
        status,
      };
    }
    default: {
      return state;
    }
  }
}

function drawPlayerStarterHand(oldDeck: Card[]): { deck: Card[]; hand: Hand } {
  let { deck, cards } = drawStarterHand(oldDeck);
  return { deck, hand: { cards, value: calculateHand(cards) } };
}

function drawDealerStarterHand(oldDeck: Card[]): { deck: Card[]; hand: Hand } {
  let { deck, cards } = drawStarterHand(oldDeck);
  cards[1].hidden = true;
  return { deck, hand: { cards, value: calculateHand(cards) } };
}

function drawStarterHand(oldDeck: Card[]): { deck: Card[]; cards: Card[] } {
  let cards: Card[] = [];
  for (let index = 0; index < 2; index++) {
    let card: Card | undefined = oldDeck[index];
    if (card) {
      cards = [...cards, card];
    }
  }
  let deck: Card[] = oldDeck.slice(2);
  return { deck, cards };
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
