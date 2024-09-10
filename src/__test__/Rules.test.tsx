import { render, screen } from "@testing-library/react";
import Rules from ".";

beforeEach(() => {
  render(<Rules />);
});

describe("Ensure the rules component renders correctly", () => {
  test("Check that the title renders", () => {
    const title = screen.getByRole("heading", { level: 4 });
    expect(title).toBeInTheDocument();
  });

  test("Check that the title renders the right text", () => {
    const title = screen.getByRole("heading", { level: 4 });
    expect(title).toHaveTextContent("Rules");
  });

  test("Check that the rules render", () => {
    const rulesText = screen.getByTestId("rules-text");
    expect(rulesText).toBeInTheDocument();
  });

  test("Check that the rules render", () => {
    const rulesText = screen.getByTestId("rules-text");
    expect(rulesText).toHaveTextContent(
      "Click a card to reveal an image. Then click another card to reveal that image. Your job is to remember the images and click two of the same cards. Good luck beating the highscore!"
    );
  });

  test("Check that good luck renders", () => {
    const goodLuck = screen.getByTestId("good-luck");
    expect(goodLuck).toBeInTheDocument();
  });

  test("Check that good luck renders the", () => {
    const goodLuck = screen.getByTestId("good-luck");
    expect(goodLuck).toHaveTextContent("Good Luck!");
  });
});
