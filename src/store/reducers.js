import {
  CHANGE_ITEMS,
  CHANGE_LIKE_ITEM,
  CHANGE_LOADING,
  DELETE_ITEM,
  GET_SESSION_STORAGE_ITEMS,
  SORT_ARRAY,
} from "./actions";

const initStateListReducer = {
  loading: false,
  items: [],
  intermediateItems: [],
  sortDirection: "default",
};

function updateSessionStorage(value) {
  window.sessionStorage.setItem("session_items", JSON.stringify(value));
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const posts = (state = initStateListReducer, action) => {
  switch (action.type) {
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CHANGE_ITEMS:
      const randomIdElement = getRandomIntInclusive(
        0,
        action.payload.length - 1
      );

      const obj = action.payload[randomIdElement].data;

      const updateItems = [
        ...state.items,
        {
          id: obj?.id,
          title: obj?.title,
          redirectUrl: obj?.url,
          isLiked: false,
        },
      ];

      updateSessionStorage(updateItems);

      return {
        ...state,
        items: updateItems,
        intermediateItems: updateItems,
      };

    case CHANGE_LIKE_ITEM:
      const mapItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            isLiked: action.payload.like,
          };
        } else {
          return item;
        }
      });

      updateSessionStorage(mapItems);

      return {
        ...state,
        items: mapItems,
        intermediateItems: mapItems,
      };

    case GET_SESSION_STORAGE_ITEMS:
      const getSessionStorage = window.sessionStorage.getItem("session_items");

      if (getSessionStorage) {
        return {
          ...state,
          items: JSON.parse(getSessionStorage),
          intermediateItems: JSON.parse(getSessionStorage),
        };
      } else {
        return {
          ...state,
        };
      }

    case DELETE_ITEM:
      const filterItems = state.items.filter((item) => {
        return item.id !== action.payload;
      });

      updateSessionStorage(filterItems);

      return {
        ...state,
        items: filterItems,
        intermediateItems: filterItems,
      };
    case SORT_ARRAY:
      return {
        ...state,
        items: action.payload.items,
        sortDirection: action.payload.sortDirection,
      };
    default:
      return { ...state };
  }
};

export { posts };
