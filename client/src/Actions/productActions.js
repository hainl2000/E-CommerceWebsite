import { constance as ACTIONS } from "../constance"
import axios from "axios"

export const fetchProducts = () => {
    return dispatch => {
        axios.get('http://localhost:8000/getAllActiveProducts').then(response => {
            return response.data.listActiveProducts
        }).then(list => {
            dispatch({
                type: ACTIONS.FETCH_PRODUCTS,
                products: list
            })
        })
    }
}

export const fetchProductsByCategory = (id) => {
    return dispatch => {
        axios.post('http://localhost:8000/getListProductsByCategory', { category: id }).then(response => {
            return response.data.listProducts
        }).then(list => {
            dispatch({
                type: ACTIONS.FETCH_PRODUCTS_BY_CATEGORY,
                products: list
            })
        })
        
    }
}

export const selectProduct = (id) => {
    return {
        type: ACTIONS.SELECT_PRODUCT,
        selected_id: id
    }
}

export const searchProduct = (searchValue) => {
    return {
        type: ACTIONS.SEARCH_PRODUCTS,
        searchValue
    }
}