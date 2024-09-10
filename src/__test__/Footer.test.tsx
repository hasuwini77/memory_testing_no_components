import { render, screen } from "@testing-library/react";
import Footer from ".";

beforeEach(() => {
  render(<Footer />);
});

describe("Ensure that footer renders correctly", () => {
  test("Check that the footer renders", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  test("Check that copyright info renders", () => {
    const copyright = screen.getByTestId("copyright");
    expect(copyright).toBeInTheDocument();
  });

  test("Check that copyright info renders the right text", () => {
    const copyright = screen.getByTestId("copyright");
    expect(copyright).toHaveTextContent("© Darius Kaya");
  });
});
