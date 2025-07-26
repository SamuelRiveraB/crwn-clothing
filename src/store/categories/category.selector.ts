import { createSelector } from "reselect";

const selectCategoryReducer = (state: { categories: any }) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce(
      (acc: { [x: string]: any }, category: { title: any; items: any }) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
      },
      {}
    )
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
