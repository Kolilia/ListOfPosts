import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { posts } from "./reducers";
import sagaPosts from "./sagaPosts";

export const allReducers = combineReducers({
  posts: posts,
});

export function* allSagas() {
  yield all([fork(sagaPosts)]);
}
