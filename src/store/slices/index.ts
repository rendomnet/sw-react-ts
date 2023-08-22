import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person, CharactersState, CharacterList, peopleId } from "../../types";

const initialState: CharactersState = {
  items: {},
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<CharactersState>>) => {
      Object.assign(state, action.payload);
    },
    mergeItems: (state, action: PayloadAction<CharacterList>) => {
      state.items = { ...state.items, ...action.payload };
    },
    mergeItem: (
      state,
      action: PayloadAction<{ data: Partial<Person>; id: peopleId }>
    ) => {
      state.items[action.payload.id] = {
        ...state.items[action.payload.id],
        ...action.payload.data,
      };
    },
  },
});

export const { set, mergeItems, mergeItem } = charactersSlice.actions;

export default charactersSlice.reducer;
