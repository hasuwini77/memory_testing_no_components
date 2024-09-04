import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NewGameButton from "../components/NewGameBtn";

test("Check that New Game button renders correctly", () => {
    const mockFunction = () => {
        return
    }
    render(<NewGameButton newRound={mockFunction}/>)
    const button = screen.getByRole("button")

    expect(button).toBeInTheDocument()
})