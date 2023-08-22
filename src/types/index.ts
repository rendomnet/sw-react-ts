export interface Person {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
  id?: peopleId;
}

export type peopleId = string | number;

export interface CharacterList {
  [key: peopleId]: Person;
}

export interface CharactersState {
  items: {
    [key: peopleId]: Person;
  };
}

export interface MovePayload {
  from: number;
  to: number;
}

export interface ItemProps {
  data: Person;
  index: number;
  optionalArgument?: string;
}

export interface SWData {
  count: number;
  results: Person[];
}

export interface CharactersHook {
  characters: Person[];
  count: number;
  isLoading: boolean;
  error: string;
  getPersonList: (page: number) => void;
  getPerson: (id: peopleId) => Promise<Person | null>;
  searchPerson: (value: string, page?: number) => void;
  getPersonId: (person: Person) => peopleId;
  openPersonPage: (person: Person) => void;
  updatePerson: (id: peopleId, person: Partial<Person>) => void;
}
