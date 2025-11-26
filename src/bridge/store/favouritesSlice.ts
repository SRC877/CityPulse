import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { EventItem } from "../types/events";

export interface FavouritesState {
  ids: string[];
  itemsById: Record<string, EventItem>;
}

const initialState: FavouritesState = {
  ids: [],
  itemsById: {},
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite(state, action: PayloadAction<EventItem>) {
      const event = action.payload;
      const id = event.id;

      // 🔐 defensive: handle old persisted shapes
      if (!state.ids) {
        state.ids = [];
      }
      if (!state.itemsById) {
        state.itemsById = {};
      }

      if (state.ids.includes(id)) {
        // remove
        state.ids = state.ids.filter((x) => x !== id);
        delete state.itemsById[id];
      } else {
        // add
        state.ids.push(id);
        state.itemsById[id] = event;
      }
    },
    clearFavourites(state) {
      state.ids = [];
      state.itemsById = {};
    },
  },
});

export const { toggleFavourite, clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
