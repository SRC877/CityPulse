import { call, put, takeLatest } from "redux-saga/effects";
import { fetchEventsApi } from "../api/eventService";
import {
  searchEventsRequest,
  searchEventsSuccess,
  searchEventsFailure,
} from "../store/eventsSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SearchEventsPayload, EventItem } from "../types/events";

function* handleSearchEvents(
  action: PayloadAction<SearchEventsPayload>
): Generator {
  try {
    const events = (yield call(
      fetchEventsApi,
      action.payload
    )) as EventItem[];
    yield put(searchEventsSuccess(events));
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch events";
    yield put(searchEventsFailure(message));
  }
}

export function* watchEvents(): Generator {
  yield takeLatest(searchEventsRequest.type, handleSearchEvents);
}
