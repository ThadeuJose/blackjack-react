import { Card } from "../src/Card";
import { expect } from "@jest/globals";
import { printCard } from "../src/components/Hand/Hand";

describe("printCard", () => {
  test("should print Pips", () => {
    const card: Card = { rank: "10", suit: "heart", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "heart_10";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print Ace", () => {
    const card: Card = { rank: "A", suit: "heart", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "heart_1";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print Jack", () => {
    const card = { rank: "J", suit: "club", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "club_jack";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print Queen", () => {
    const card = { rank: "Q", suit: "club", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "club_queen";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print King", () => {
    const card = { rank: "K", suit: "club", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "club_king";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print Hidden", () => {
    const card = { rank: "K", suit: "club", hidden: true };
    const imagePath = printCard(card);
    const expectedPath = "back";
    expect(imagePath).toBe(expectedPath);
  });
});
