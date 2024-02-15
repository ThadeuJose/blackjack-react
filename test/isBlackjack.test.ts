import { expect } from "@jest/globals";
import { Card } from "../src/Card";
import { isBlackjack } from "../src/components/Game/Redux";

describe("isBlackjack", () => {
  test("should only be a natural blackjack if is 2 cards", () => {
    const hand: Card[] = [
      { rank: "10", suit: "heart", hidden: false },
      { rank: "2", suit: "heart", hidden: false },
      { rank: "A", suit: "heart", hidden: false },
    ];
    const value: boolean = isBlackjack(hand);
    expect(value).toBeFalsy();
  });
  test("should be a blackjack", () => {
    const hand: Card[] = [
      { rank: "10", suit: "heart", hidden: false },
      { rank: "A", suit: "heart", hidden: false },
    ];
    const value: boolean = isBlackjack(hand);
    expect(value).toBeTruthy();
  });
});
