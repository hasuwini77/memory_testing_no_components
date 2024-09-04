import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../components/Highscore";
import Highscore from "../components/Highscore";

const mockFunction = () => {
    return
}

jest.spyOn(Storage.prototype, 'setItem');

describe("Ensure the popup renders correctly and sets name to local storage", () => {

    test("Check that the highscore popup contains all it's elements", () => {
        render(<Highscore updateNewHighscore={mockFunction} />)

        const highscorePopup = screen.queryByTestId("highscore-popup")
        const userInput = screen.queryByTestId("input")
        const title = screen.getByRole("heading", { level: 2 })
        const button = screen.getByRole("button")

        expect(highscorePopup).toBeInTheDocument()
        expect(userInput).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    test("Check that button click sets endered name to local storage", () => {
        render(<Highscore updateNewHighscore={mockFunction} />)

        let userInput = screen.getByTestId("input")
        const button = screen.getByRole("button")
        const mockName = "Bartholomew"

        expect((userInput as HTMLInputElement).value).toBe('')

        fireEvent.change(userInput, { target: { value: mockName } })

        userInput = screen.getByTestId("input")

        expect((userInput as HTMLInputElement).value).toBe(mockName)

        fireEvent.click(button)

        expect(localStorage.setItem).toHaveBeenCalledWith('name', mockName);
    })
})
