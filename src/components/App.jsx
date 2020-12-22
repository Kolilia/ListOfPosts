import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_SESSION_STORAGE_ITEMS } from "../store/actions";
import ListPosts from "./ListPosts";
import Subedits from "./Subedits";

const App = () => {
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch({ type: GET_SESSION_STORAGE_ITEMS });
    },
    [dispatch]
  );

  return (
    <>
      <Subedits />
      <ListPosts />
    </>
  );
};

export default App;
