import { constance as ACTIONS } from "../constance"

const initialState = {
    products: [],
    productsByCategory: [],
    searchedProducts: [],
    cart: [],
    selected_id: null
}

export const productReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case ACTIONS.FETCH_PRODUCTS:
            return {
                ...state,
                products: action.products
            }

        case ACTIONS.SELECT_PRODUCT:
            return {
                ...state,
                selected_id: action.selected_id
            }

        case ACTIONS.FETCH_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                productsByCategory: action.products
            }

        case ACTIONS.SEARCH_PRODUCTS:
            const products = state.products.filter(product => product.nameProduct.toLowerCase().includes(action.searchValue.toLowerCase()))
            
            return {
                ...state,
                searchedProducts: products
            }

        default: return state
    }
}