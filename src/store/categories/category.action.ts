import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { DocumentData } from "firebase/firestore";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../root-reducer";

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, null);

export const fetchCategoriesSuccess = (categoriesArray: DocumentData[]) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error: Error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync =
  () => async (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailed(error as Error));
    }
  };
