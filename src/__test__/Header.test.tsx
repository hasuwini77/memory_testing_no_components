import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Test that the header is bloody awesome", () => {
    test("Check that h1 is rendered correctly", () => {
        render(<Header/>)
        const h1 = screen.getByRole("heading")

        expect(h1).toBeInTheDocument()
        expect(h1).toHaveTextContent("Memorista")
    })

    test("Check that memorista logo is rendered", () => {
        render(<Header />)
        const logo = screen.getByRole("img", {name: "logo"})

        expect(logo).toBeInTheDocument()
    })
})