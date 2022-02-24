import { createSelector } from 'reselect'

export const getAllCategories = state => state.categoryReducer.categories
export const getSelectedCategory = state => state.categoryReducer.categories.find(category => category._id === state.categoryReducer.selected_category)

export const allCategoriesSelector = createSelector(
    getAllCategories,
    categories => categories
)

export const selectedCategorySelector = createSelector(
    getSelectedCategory,
    category => category
)