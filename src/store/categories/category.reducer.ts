import {
  CATEGORIES_INITIAL_STATE,
  CATEGORIES_ACTION_TYPES,
  CategoryAction,
} from "./category.types";

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: CategoryAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
