import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { fetchApi } from "../utils/api";
import useCharacters from "./useCharacters";
import { Provider } from "react-redux";
import { Person } from "../types";
import { MemoryRouter as Router } from "react-router-dom";
import { mergeItem } from "../store/slices";

import * as redux from "react-redux";
import { useNavigate } from "react-router-dom";

jest.mock("../utils/api", () => ({
  fetchApi: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("useCharacters hook", () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();
  const mockState = {
    characters: {
      items: {},
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (redux.useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (redux.useSelector as jest.Mock).mockReturnValue(mockState.characters);
  });

  it("should handle getPersonList successfully", async () => {
    const mockData = {
      results: [
        { name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/" },
      ],
      count: 1,
    };
    (fetchApi as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCharacters());

    act(() => {
      result.current.getPersonList(1);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockDispatch).toHaveBeenCalled();
    expect(result.current.characters).toHaveLength(1);
    expect(result.current.error).toBe("");
  });

  it("should handle searchPerson successfully", async () => {
    const mockData = {
      results: [
        { name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/" },
      ],
      count: 1,
    };
    (fetchApi as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCharacters());

    act(() => {
      result.current.searchPerson("Luke");
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockDispatch).toHaveBeenCalled();
    expect(result.current.characters).toHaveLength(1);
    expect(result.current.characters[0].name).toBe("Luke Skywalker");
    expect(result.current.error).toBe("");
  });

  it("should handle getPerson successfully", async () => {
    const mockData = {
      name: "Luke Skywalker",
      url: "https://swapi.dev/api/people/1/",
    };
    (fetchApi as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCharacters());

    let fetchedData;
    act(() => {
      fetchedData = result.current.getPerson("1");
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe("");
    expect(fetchedData).resolves.toEqual({
      ...mockData,
      id: "1",
    });
  });

  it("should handle updatePerson successfully", async () => {
    const mockId = "1";
    const mockPerson = { name: "Luke Skywalker" };

    const { result } = renderHook(() => useCharacters());

    act(() => {
      result.current.updatePerson(mockId, mockPerson);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockDispatch).toHaveBeenCalledWith(
      mergeItem({
        id: mockId,
        data: {
          ...mockPerson,
          edited: expect.any(String),
        },
      })
    );

    expect(result.current.error).toBe("");
  });

  it("should handle errors", async () => {
    (fetchApi as jest.Mock).mockRejectedValueOnce(
      new Error("An error occurred")
    );

    const { result } = renderHook(() => useCharacters());

    act(() => {
      result.current.getPersonList(1);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.characters).toHaveLength(0);
    expect(result.current.error).toBe("An error occurred");
  });

  // ... More tests for other methods like getPerson, updatePerson, etc.
});
