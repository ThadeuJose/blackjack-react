import { Card } from "../src/Card";
import { expect } from "@jest/globals";
import { printCard } from "../src/components/Hand/Hand";

describe("printCard", () => {
  test("should print Pips", () => {
    const card: Card = { rank: "10", suit: "heart", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "images/heart_10.png";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print Ace", () => {
    const card: Card = { rank: "A", suit: "heart", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "images/heart_1.png";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print Jack", () => {
    const card = { rank: "J", suit: "club", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "images/club_jack.png";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print Queen", () => {
    const card = { rank: "Q", suit: "club", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "images/club_queen.png";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print King", () => {
    const card = { rank: "K", suit: "club", hidden: false };
    const imagePath = printCard(card);
    const expectedPath = "images/club_king.png";
    expect(imagePath).toBe(expectedPath);
  });

  test("should print Hidden", () => {
    const card = { rank: "K", suit: "club", hidden: true };
    const imagePath = printCard(card);
    const expectedPath = "images/back.png";
    expect(imagePath).toBe(expectedPath);
  });
});
