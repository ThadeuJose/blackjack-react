import { Card } from "../../Card";

const startMessage: string = "Press 'New Game' to begin";
const initialHandDealtMessage: string = "The initial hands are dealt";
const winnerMessage: string = "You won";
const lostMessage: string = "You lost";
const tieMessage: string = "You tie";

export type Hand = {
  cards: Card[];
  value: number;
};

export type Status = "Start" | "IsPlaying" | "Tie" | "Win" | "Lost";

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
        dealerHand.cards[1].hidden = false;
        dealerHand.value = calculateHand(dealerHand.cards);

        if (isBlackjack(dealerHand.cards)) {
          message = tieMessage;
          status = "Tie";
        } else {
          message = winnerMessage;
          status = "Win";
        }
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
      let dealerHand: Hand = { cards: [], value: 0 };
      dealerHand.cards = [...state.dealerHand.cards];
      dealerHand.value = calculateHand(dealerHand.cards);

      let message: string = initialHandDealtMessage;
      let status: Status = "IsPlaying";

      if (playerHand.value > 21) {
        message = lostMessage;
        status = "Lost";
      }

      if (playerHand.value === 21) {
        dealerHand.cards[1].hidden = false;
        dealerHand.value = calculateHand(dealerHand.cards);

        if (isBlackjack(dealerHand.cards)) {
          message = lostMessage;
          status = "Lost";
        } else {
          message = winnerMessage;
          status = "Win";
        }
      }

      return {
        ...state,
        playerHand,
        dealerHand,
        deck,
        message,
        status,
      };
    }
    case StayAction: {
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

      let { message, status } = calculateResult(
        dealerHand.value,
        state.playerHand.value
      );

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

function calculateResult(
  dealerHandValue: number,
  playerHandValue: number
): { message: string; status: Status } {
  const win: { message: string; status: Status } = {
    message: winnerMessage,
    status: "Win",
  };
  const lost: { message: string; status: Status } = {
    message: lostMessage,
    status: "Lost",
  };
  const tie: { message: string; status: Status } = {
    message: tieMessage,
    status: "Tie",
  };

  if (dealerHandValue > 21) {
    return win;
  }

  if (dealerHandValue === 21) {
    return lost;
  }

  if (dealerHandValue > playerHandValue) {
    return lost;
  }

  if (dealerHandValue === playerHandValue) {
    return tie;
  }
  return win;
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
  const UpdatedHand = hand.filter((card) => !card.hidden);
  let total: number = UpdatedHand.map((card) =>
    calculateValue(card.rank)
  ).reduce((accumulator, value) => accumulator + value, 0);
  let hasAce: boolean = UpdatedHand.some((card) => card.rank === "A");
  if (total < 12 && hasAce) {
    total += 10;
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

export function isBlackjack(hand: Card[]): boolean {
  const UpdatedHand = hand.filter((card) => !card.hidden);
  let hasAce: boolean = UpdatedHand.some((card) => card.rank === "A");
  let has10: boolean = UpdatedHand.some(
    (card) => calculateValue(card.rank) === 10
  );
  return hasAce && has10;
}
