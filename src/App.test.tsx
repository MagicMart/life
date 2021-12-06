import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    it("renders App component", () => {
        const result = render(<App />);
        expect(result).toBeTruthy();
    });
    it("renders the correct title", () => {
        render(<App />);
        expect(screen.getByText("Game of Life")).toBeInTheDocument();
    });
});
