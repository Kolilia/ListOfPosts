import { getRandomIntInclusive } from "../helpers/getRandomIntInclusive";
import { updateSessionStorage } from "../helpers/updateSessionStorage";
import {
  CHANGE_LIKE_ITEM,
  CHANGE_LOADING,
  DELETE_ITEM,
  GET_SESSION_STORAGE_ITEMS,
  SET_ITEMS,
  SORT_ARRAY,
} from "./actions";

const intiState = {
  loading: false,
  items: [],
  intermediateItems: [],
  sortDirection: "default",
};

const posts = (state = intiState, action) => {
  switch (action.type) {
    case CHANGE_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_ITEMS: {
      const randomIdElement = getRandomIntInclusive(
        0,
        action.payload.length - 1
      );

      const obj = action.payload[randomIdElement];

      if (!obj?.data) {
        return state;
      }

      const newItems = [
        ...state.items,
        {
          id: obj.data?.id,
          title: obj?.data?.title,
          redirectUrl: obj?.data?.url,
          isLiked: false,
        },
      ];

      updateSessionStorage(newItems);

      return {
        ...state,
        items: newItems,
        intermediateItems: newItems,
      };
    }
    case CHANGE_LIKE_ITEM: {
      const newItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            isLiked: action.payload.like,
          };
        } else {
          return item;
        }
      });

      updateSessionStorage(newItems);

      return {
        ...state,
        items: newItems,
        intermediateItems: newItems,
      };
    }

    case GET_SESSION_STORAGE_ITEMS: {
      const getSessionStorage = window.sessionStorage.getItem("session_items");

      if (getSessionStorage) {
        return {
          ...state,
          items: JSON.parse(getSessionStorage),
          intermediateItems: JSON.parse(getSessionStorage),
        };
      }
      return state;
    }

    case DELETE_ITEM: {
      const newItems = state.items.filter((item) => {
        return item.id !== action.payload;
      });

      updateSessionStorage(newItems);

      return {
        ...state,
        items: newItems,
        intermediateItems: newItems,
      };
    }
    case SORT_ARRAY: {
      const newItems = [...state.intermediateItems].sort((a, b) => {
        const labelA = a.title.toLowerCase();
        const labelB = b.title.toLowerCase();

        if (action.payload === "asc") {
          if (labelA < labelB) {
            return -1;
          }
          if (labelA > labelB) {
            return 1;
          }
          return 0;
        } else if (action.payload === "desc") {
          if (labelA < labelB) {
            return 1;
          }
          if (labelA > labelB) {
            return -1;
          }
          return 0;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        items: newItems,
        sortDirection: action.payload,
      };
    }
    default:
      return state;
  }
};

export { posts };
