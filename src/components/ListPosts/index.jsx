import {
  Container,
  LinearProgress,
  List,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SORT_ARRAY } from "../../store/actions";
import Post from "./Post";

const useStyles = makeStyles({
  list: {
    maxHeight: 400,
    overflowY: "auto",
  },
  filter: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const ListPosts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.posts.loading);
  const items = useSelector((state) => state.posts.items);
  const sortDirection = useSelector((state) => state.posts.sortDirection);

  const mapItems = items.map((item) => <Post key={item.id} item={item} />);

  const onChange = (event) => {
    const { value } = event.target;

    dispatch({
      type: SORT_ARRAY,
      payload: value,
    });
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <div className={classes.filter}>
          <TextField
            onChange={onChange}
            label="Filter"
            value={sortDirection || "default"}
            select
          >
            <MenuItem key="default" value="default">
              Default
            </MenuItem>
            <MenuItem key="asc" value="asc">
              Asc
            </MenuItem>
            <MenuItem key="desc" value="desc">
              Desc
            </MenuItem>
          </TextField>
        </div>
        {loading && <LinearProgress />}
        <List className={classes.list}>{mapItems}</List>
      </Paper>
    </Container>
  );
};

export default ListPosts;
