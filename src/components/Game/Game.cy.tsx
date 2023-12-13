import React from "react";
import Game from "./Game";
import { Card } from "../../Card";

describe("<Game />", () => {
  it("renders", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "hearts", hidden: false },
      { rank: "3", suit: "hearts", hidden: false },
      { rank: "K", suit: "clubs", hidden: false },
      { rank: "A", suit: "clubs", hidden: false },
    ];

    cy.mount(<Game deckOfCards={testDeckOfCards} />);
  });

  it("When press new game get two card in dealer hand and player hand, one card in dealer hand should be hidden", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "3", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
    ];

    cy.mount(<Game deckOfCards={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();

    cy.get("img").eq(0).should("have.attr", "src", "images/heart_2.png");
    cy.get("img").eq(1).should("have.attr", "src", "images/heart_3.png");
    cy.get("img").eq(2).should("have.attr", "src", "images/club_king.png");
    cy.get("img").eq(3).should("have.attr", "src", "images/back.png");
  });

  it("When press new game, should show correct sum of points in player and dealer hand", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "3", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
    ];

    cy.mount(<Game deckOfCards={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();

    cy.get("[data-cy='playerHandValue']").contains(5);
    cy.get("[data-cy='dealerHandValue']").contains(10);
  });
});
