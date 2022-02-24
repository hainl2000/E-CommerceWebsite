import { createSelector } from 'reselect'

const getActiveProducts = state => state.productReducer.products
const getActiveProductsByCategories = state => {
    const products = state.productReducer.products
    const categories = state.categoryReducer.categories

    if (products.length !== 0 && categories.length !== 0)
    {
        return categories.map(category => ({id: category._id, category_name: category.nameCategory, products: products.filter(product => product.category === category._id)})) || []
    }

    return []
}
const getProductById = state => state.productReducer.products.find(product => product._id === state.productReducer.selected_id) || {}
const getActiveProductsByCategory = state => state.productReducer.productsByCategory
const getSearchProducts = state => state.productReducer.searchedProducts

export const activeProductsSelector = createSelector(
    getActiveProducts,
    products => products
)

export const activeProductsByCategoriesSelector = createSelector(
    getActiveProductsByCategories,
    products => products
)

export const activeProductsByCategorySelector = createSelector(
    getActiveProductsByCategory,
    products => products
)

export const selectedProductSelector = createSelector(
    getProductById,
    product => product
)

export const searchProductsSelector = createSelector(
    getSearchProducts,
    products => products
)