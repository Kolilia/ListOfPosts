import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { CHANGE_LOADING, FETCH_POSTS, SET_ITEMS } from "./actions";

function* fetchPosts(action) {
  try {
    yield put({ type: CHANGE_LOADING, payload: true });

    const result = yield axios.get(
      `https://www.reddit.com/r/${action.payload}.json`
    );

    yield put({ type: SET_ITEMS, payload: result.data.data.children });

    yield put({ type: CHANGE_LOADING, payload: false });
  } catch (err) {
    console.log(err);
    yield put({ type: CHANGE_LOADING, payload: false });
  }
}

export default function* sagaPosts() {
  yield takeEvery(FETCH_POSTS, fetchPosts);
}
