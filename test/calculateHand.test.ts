import { Card } from "../src/Card";
import { expect } from "@jest/globals";
import { calculateHand } from "../src/components/Game/Redux";

describe("calculateHand", () => {
  test("should count value", () => {
    const card: Card = { rank: "10", suit: "heart", hidden: false };
    const value = calculateHand([card]);
    const expectedValue = 10;
    expect(value).toBe(expectedValue);
  });
  test("should sum values", () => {
    const value = calculateHand([
      { rank: "10", suit: "heart", hidden: false },
      { rank: "9", suit: "clubs", hidden: false },
    ]);
    const expectedValue = 19;
    expect(value).toBe(expectedValue);
  });
  test("should sum values with face cards", () => {
    const value = calculateHand([
      { rank: "J", suit: "heart", hidden: false },
      { rank: "Q", suit: "clubs", hidden: false },
      { rank: "K", suit: "clubs", hidden: false },
    ]);
    const expectedValue = 30;
    expect(value).toBe(expectedValue);
  });
  test("should count Ace as 1", () => {
    const value = calculateHand([
      { rank: "A", suit: "heart", hidden: false },
      { rank: "8", suit: "clubs", hidden: false },
      { rank: "10", suit: "clubs", hidden: false },
      { rank: "2", suit: "clubs", hidden: false },
    ]);
    const expectedValue = 21;
    expect(value).toBe(expectedValue);
  });
  test("should count double Ace as 1 and 11", () => {
    const value = calculateHand([
      { rank: "A", suit: "heart", hidden: false },
      { rank: "A", suit: "clubs", hidden: false },
      { rank: "9", suit: "clubs", hidden: false },
    ]);
    const expectedValue = 21;
    expect(value).toBe(expectedValue);
  });
  test("should count double Ace as 11", () => {
    const value = calculateHand([
      { rank: "A", suit: "heart", hidden: false },
      { rank: "10", suit: "clubs", hidden: false },
    ]);
    const expectedValue = 21;
    expect(value).toBe(expectedValue);
  });
  test("shouldn't count hidden cards", () => {
    const value = calculateHand([
      { rank: "A", suit: "heart", hidden: false },
      { rank: "10", suit: "clubs", hidden: true },
    ]);
    const expectedValue = 11;
    expect(value).toBe(expectedValue);
  });
});
