import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { EventItem, SearchEventsPayload } from "../types/events";

export interface EventsState {
  items: EventItem[];
  loading: boolean;
  error: string | null;
  lastQuery: SearchEventsPayload | null;
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
  lastQuery: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    searchEventsRequest(state, action: PayloadAction<SearchEventsPayload>) {
      state.loading = true;
      state.error = null;
      state.lastQuery = action.payload;
    },
    searchEventsSuccess(state, action: PayloadAction<EventItem[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    searchEventsFailure(state, action: PayloadAction<string | undefined>) {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong";
    },
  },
});

export const {
  searchEventsRequest,
  searchEventsSuccess,
  searchEventsFailure,
} = eventsSlice.actions;

export default eventsSlice.reducer;
