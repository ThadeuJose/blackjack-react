import { useReducer } from "react";
import Game from "./Game";
import { Card } from "../../Card";
import { reducer, init } from "./Redux";
import { Store } from "../../Store";

describe("<Game />", () => {
  it("renders", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "hearts", hidden: false },
      { rank: "3", suit: "hearts", hidden: false },
      { rank: "K", suit: "clubs", hidden: false },
      { rank: "A", suit: "clubs", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);
  });

  it("Shouldn't show hit and stay button when game begin", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "hearts", hidden: false },
      { rank: "3", suit: "hearts", hidden: false },
      { rank: "K", suit: "clubs", hidden: false },
      { rank: "A", suit: "clubs", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='HitButton']").should("not.exist");
    cy.get("[data-cy='StayButton']").should("not.exist");
  });

  it("Shouldn't show dealer or player hand text when game begin", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "hearts", hidden: false },
      { rank: "3", suit: "hearts", hidden: false },
      { rank: "K", suit: "clubs", hidden: false },
      { rank: "A", suit: "clubs", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.contains("Dealer's hand").should("not.exist");
    cy.contains("Player's hand").should("not.exist");
  });

  it("Should show start message when begin", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "hearts", hidden: false },
      { rank: "3", suit: "hearts", hidden: false },
      { rank: "K", suit: "clubs", hidden: false },
      { rank: "A", suit: "clubs", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='status']").should(
      "have.text",
      "Press 'New Game' to begin"
    );
  });

  it("When press new game get two card in dealer hand and player hand, one card in dealer hand should be hidden", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "3", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();

    cy.get("img").eq(0).should("have.attr", "src", "images/club_king.png");
    cy.get("img").eq(1).should("have.attr", "src", "images/back.png");
    cy.get("img").eq(2).should("have.attr", "src", "images/heart_2.png");
    cy.get("img").eq(3).should("have.attr", "src", "images/heart_3.png");
  });

  it("Should show hand dealt message when begin", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "hearts", hidden: false },
      { rank: "3", suit: "hearts", hidden: false },
      { rank: "K", suit: "clubs", hidden: false },
      { rank: "A", suit: "clubs", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();

    cy.get("[data-cy='status']").should(
      "have.text",
      "The initial hands are dealt"
    );
  });

  it("When press new game, should show correct sum of points in player and dealer hand", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "3", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();

    cy.get("[data-cy='playerHandValue']").contains(5);
    cy.get("[data-cy='dealerHandValue']").contains(10);
  });

  it("When press hit, should draw a card and put in player hand", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "3", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
      { rank: "10", suit: "club", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();
    cy.get("[data-cy='HitButton']").click();

    cy.get("img").eq(0).should("have.attr", "src", "images/club_king.png");
    cy.get("img").eq(1).should("have.attr", "src", "images/back.png");
    cy.get("img").eq(2).should("have.attr", "src", "images/heart_2.png");
    cy.get("img").eq(3).should("have.attr", "src", "images/heart_3.png");
    cy.get("img").eq(4).should("have.attr", "src", "images/club_10.png");
  });

  it("When press hit, should draw a card and put in player hand until is bust", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "3", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
      { rank: "10", suit: "club", hidden: false },
      { rank: "10", suit: "heart", hidden: false },
      { rank: "10", suit: "spade", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();
    cy.get("[data-cy='HitButton']").click();
    cy.get("[data-cy='HitButton']").click();

    cy.get("img").eq(0).should("have.attr", "src", "images/club_king.png");
    cy.get("img").eq(1).should("have.attr", "src", "images/back.png");
    cy.get("img").eq(2).should("have.attr", "src", "images/heart_2.png");
    cy.get("img").eq(3).should("have.attr", "src", "images/heart_3.png");
    cy.get("img").eq(4).should("have.attr", "src", "images/club_10.png");
    cy.get("img").eq(5).should("have.attr", "src", "images/heart_10.png");

    cy.get("img").should("have.length", 6);
  });

  it("When press hit, should draw a card and put in player hand until is bust", () => {
    const testDeckOfCards: Card[] = [
      { rank: "10", suit: "heart", hidden: false },
      { rank: "10", suit: "club", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
      { rank: "5", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
      { rank: "10", suit: "heart", hidden: false },
      { rank: "10", suit: "spade", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();
    cy.get("[data-cy='HitButton']").click();

    cy.get("img").eq(0).should("have.attr", "src", "images/club_king.png");
    cy.get("img").eq(1).should("have.attr", "src", "images/back.png");
    cy.get("img").eq(2).should("have.attr", "src", "images/heart_10.png");
    cy.get("img").eq(3).should("have.attr", "src", "images/club_10.png");
    cy.get("img").eq(4).should("have.attr", "src", "images/club_5.png");

    cy.get("img").should("have.length", 5);
  });

  it("Should won with a 21 in start hand", () => {
    const testDeckOfCards: Card[] = [
      { rank: "A", suit: "heart", hidden: false },
      { rank: "K", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();

    cy.get("[data-cy='status']").should("have.text", "You won");
  });

  it("Should reset hand after won", () => {
    const testDeckOfCards: Card[] = [
      { rank: "A", suit: "heart", hidden: false },
      { rank: "K", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
      { rank: "2", suit: "club", hidden: false },
      { rank: "3", suit: "club", hidden: false },
      { rank: "2", suit: "heart", hidden: false },
      { rank: "3", suit: "club", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();

    cy.get("[data-cy='status']").should("have.text", "You won");

    cy.get("[data-cy='NewGameButton']").click();

    cy.get("img").should("have.length", 4);
  });

  it("Should lost with a 21 in dealer hand", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "K", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();
    cy.get("[data-cy='StayButton']").click();

    cy.get("[data-cy='status']").should("have.text", "You lost");
  });

  it("Should show New Game button when lost", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "K", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "A", suit: "club", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();
    cy.get("[data-cy='StayButton']").click();

    cy.get("[data-cy='NewGameButton']").should("exist");
  });

  it("Should win with a dealer bust", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "K", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "7", suit: "club", hidden: false },
      { rank: "7", suit: "heart", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();
    cy.get("[data-cy='StayButton']").click();

    cy.get("[data-cy='status']").should("have.text", "You won");
  });

  it("Should lost with player bust", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "K", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "7", suit: "club", hidden: false },
      { rank: "7", suit: "heart", hidden: false },
      { rank: "7", suit: "spade", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();
    cy.get("[data-cy='HitButton']").click();
    cy.get("[data-cy='HitButton']").click();

    cy.get("[data-cy='status']").should("have.text", "You lost");
  });

  it("Should win without a bust or blackjack", () => {
    const testDeckOfCards: Card[] = [
      { rank: "2", suit: "heart", hidden: false },
      { rank: "K", suit: "heart", hidden: false },
      { rank: "K", suit: "club", hidden: false },
      { rank: "8", suit: "club", hidden: false },
      { rank: "7", suit: "heart", hidden: false },
    ];

    cy.mount(<Store deck={testDeckOfCards} />);

    cy.get("[data-cy='NewGameButton']").click();
    cy.get("[data-cy='HitButton']").click();
    cy.get("[data-cy='StayButton']").click();

    cy.get("[data-cy='status']").should("have.text", "You won");
  });
});
