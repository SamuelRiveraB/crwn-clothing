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
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
