import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App"; // Update this import path to your App component

import * as redux from "react-redux";
const mockNavigate = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => mockNavigate),
}));

describe("App Routing", () => {
  const mockDispatch = jest.fn();
  const mockState = {
    characters: {
      items: {},
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (redux.useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (redux.useSelector as jest.Mock).mockReturnValue(mockState.characters);
  });

  it("should render Grid component for / path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const gridElement = screen.getByText(/StarWars/); // Replace with actual expected text
    expect(gridElement).toBeTruthy();
  });

  it("should render Edit component for /edit/:id path", () => {
    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <App />
      </MemoryRouter>
    );
    const editElement = screen.getByText(/Edit Person/); // Replace with actual expected text
    expect(editElement).toBeTruthy();
  });
});
