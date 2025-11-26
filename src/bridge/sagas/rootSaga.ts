import { all, call } from "redux-saga/effects";
import { watchEvents } from "./eventsSaga";

export default function* rootSaga(): Generator {
  yield all([call(watchEvents)]);
}
