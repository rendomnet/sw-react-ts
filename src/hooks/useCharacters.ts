import { useState } from "react";
import {
  CharacterList,
  Person,
  peopleId,
  CharactersHook,
  SWData,
} from "../types";
import { fetchApi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mergeItem, mergeItems } from "../store/slices";
import { RootState } from "../store/store";

const BASE_URL = "https://swapi.dev/api/people/";

function useCharacters(): CharactersHook {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const characterState = useSelector((state: RootState) => state.characters);
  const [characters, setCharacters] = useState<Person[]>([]);
  const [count, setCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function getPersonId(person: Person): peopleId {
    const urlSegments = person.url.split("/");
    return urlSegments[urlSegments.length - 2];
  }

  function openPersonPage(person: Person): void {
    navigate(`/edit/${getPersonId(person)}`);
  }

  function personEditedCompare(a: Person, b: Person): boolean {
    return new Date(a.edited) < new Date(b.edited);
  }

  function populateCharacters(data: SWData): void {
    const { results: items, count } = data;
    const people: CharacterList = { ...characterState.items };

    const result: Person[] = [];
    items.forEach((person) => {
      const id = getPersonId(person);
      const existing: Person = people[id];

      if (!existing || (existing && personEditedCompare(existing, person))) {
        people[id] = person;
      }
      result.push({ ...people[id], id: id });
    });

    dispatch(mergeItems(people));
    setCharacters(result);
    setCount(count);
  }

  function handleError(error: any): void {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unexpected error occurred.");
    }
  }

  async function withLoading<T>(fn: () => Promise<T>): Promise<T | undefined> {
    setIsLoading(true);
    setError("");
    try {
      return await fn();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getPerson = async (id: peopleId): Promise<Person | null> => {
    const result = await withLoading(async () => {
      const data: Person = await fetchApi(`${BASE_URL}/${id}/`);
      if (data?.url) {
        const existing = characterState.items[id];
        return existing && !personEditedCompare(existing, data)
          ? { ...existing }
          : { ...data, id };
      }
      return null;
    });
    if (result) return result;
    return null;
  };

  const getPersonList = async (page: number): Promise<void> => {
    await withLoading(async () => {
      const data: SWData = await fetchApi(
        `${BASE_URL}?page=${page}&format=json`
      );
      populateCharacters(data);
    });
  };

  const updatePerson = async (
    id: peopleId,
    person: Partial<Person>
  ): Promise<void> => {
    await withLoading(async () => {
      dispatch(
        mergeItem({ id, data: { ...person, edited: new Date().toISOString() } })
      );
    });
  };

  const searchPerson = async (
    value: string,
    page: number = 1
  ): Promise<void> => {
    await withLoading(async () => {
      const data: SWData = await fetchApi(
        `${BASE_URL}/?search=${value}&page=${page}`
      );
      populateCharacters(data);
    });
  };

  return {
    characters,
    count,
    isLoading,
    error,
    getPersonList,
    getPerson,
    searchPerson,
    getPersonId,
    openPersonPage,
    updatePerson,
  };
}

export default useCharacters;
