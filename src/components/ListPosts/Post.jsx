import { IconButton, ListItem, ListItemText } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Delete, Favorite, FavoriteBorder } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { CHANGE_LIKE_ITEM, DELETE_ITEM } from "../../store/actions";

const useStyles = makeStyles({
  content: {
    display: "flex",
    alignItems: "center",
  },
  like: {
    color: red[400],
  },
  url: {
    color: blue[600],
  },
});

const Post = ({ item }) => {
  const { id, title, redirectUrl, isLiked } = item || {};
  const dispatch = useDispatch();
  const classes = useStyles();

  function like() {
    dispatch({ type: CHANGE_LIKE_ITEM, payload: { id: id, like: true } });
  }

  function unLike() {
    dispatch({ type: CHANGE_LIKE_ITEM, payload: { id: id, like: false } });
  }

  function deleteItem() {
    dispatch({ type: DELETE_ITEM, payload: id });
  }

  return (
    <ListItem>
      <ListItemText
        primary={
          <div className={classes.content}>
            {isLiked ? (
              <IconButton onClick={unLike} className={classes.like}>
                <Favorite />
              </IconButton>
            ) : (
              <IconButton onClick={like}>
                <FavoriteBorder />
              </IconButton>
            )}
            <IconButton onClick={deleteItem}>
              <Delete />
            </IconButton>
            <a
              target="_blank"
              rel="noreferrer"
              href={redirectUrl}
              className={classes.url}
            >
              {title}
            </a>
          </div>
        }
      />
    </ListItem>
  );
};

export default Post;
