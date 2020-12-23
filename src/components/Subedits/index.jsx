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
    animation: "$marquee 15s ease infinite",
    "&:hover": {
      animationPlayState: "paused",
      backgroundColor: blue[500],
    },
  },
  "@keyframes marquee": {
    "0%": {
      transform: `translateX(calc(${window.innerWidth}px - 100% - 30px))`,
    },
    "50%": {
      transform: `translateX(0px)`,
    },
    "100%": {
      transform: `translateX(calc(${window.innerWidth}px - 100% - 30px))`,
    },
  },
});

const Subedits = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.marquee}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: FETCH_POSTS, payload: "frontend" })}
          className={classes.button}
        >
          Frontend
        </Button>
      </div>
      <div className={classes.marquee}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: FETCH_POSTS, payload: "reactjs" })}
          className={classes.button}
        >
          ReactJs
        </Button>
      </div>
      <div className={classes.marquee}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: FETCH_POSTS, payload: "vuejs" })}
          className={classes.button}
        >
          VueJs
        </Button>
      </div>
      <div className={classes.marquee}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: FETCH_POSTS, payload: "angular" })}
          className={classes.button}
        >
          AngularJs
        </Button>
      </div>
    </div>
  );
};

export default Subedits;
