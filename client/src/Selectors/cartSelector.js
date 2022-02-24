import { createSelector } from 'reselect'

const getCart = state => state.cartReducer.products || []

export const productsCartSelector = createSelector(
    getCart,
    products => products
)