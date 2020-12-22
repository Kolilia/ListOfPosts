import { Button } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { FETCH_POSTS } from "../../store/actions";

const useStyles = makeStyles({
  marquee: {
    marginBottom: "1rem",
    width: "100%",
  },
  button: {
    animation: "$marquee 8s linear infinite",
    width: "40%",
    "&:hover": {
      animationPlayState: "paused",
      backgroundColor: blue[500],
    },
  },
  "@keyframes marquee": {
    "0%": {
      transform: "translate(150%, 0)",
    },
    "100%": {
      transform: "translate(-100%, 0)",
    },
  },
});

const Subedits = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  function onClickFrontend() {
    dispatch({ type: FETCH_POSTS, payload: "frontend" });
  }
  function onClickReactJs() {
    dispatch({ type: FETCH_POSTS, payload: "reactjs" });
  }
  function onClickVueJs() {
    dispatch({ type: FETCH_POSTS, payload: "vuejs" });
  }
  function onClickAngularJs() {
    dispatch({ type: FETCH_POSTS, payload: "angular" });
  }

  return (
    <div>
      <div className={classes.marquee}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickFrontend}
          className={classes.button}
        >
          Frontend
        </Button>
      </div>
      <div className={classes.marquee}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickReactJs}
          className={classes.button}
        >
          ReactJs
        </Button>
      </div>
      <div className={classes.marquee}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickVueJs}
          className={classes.button}
        >
          VueJs
        </Button>
      </div>
      <div className={classes.marquee}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickAngularJs}
          className={classes.button}
        >
          AngularJs
        </Button>
      </div>
    </div>
  );
};

export default Subedits;
