import axios from 'axios'

import { constance as ACTIONS } from "../constance"

export const addIntoCart = (product) => {
    return dispatch => {
        axios.post('/user/cart/add', { productId: product._id, quantity: 1 }, { withCredentials: true })
        .then(response => {
            console.log(response.data)
            dispatch(fetchCartItem())
        })
    }
}

export const discardFromCart = (product) => {
    return dispatch => {
        axios.post('/user/cart/discard', { productId: product._id }, { withCredentials: true })
        .then(response => {
            console.log(response)
            dispatch(fetchCartItem())
        })
    }
}

export const discardFromCartAll = (product) => {
    return dispatch => {
        axios.post('/user/cart/remove', { productId: product._id }, { withCredentials: true })
        .then(response => {
            console.log(response)
            dispatch(fetchCartItem())
        })
    }
}

export const fetchCartItem = () => {
    return dispatch => {
        axios.get('user/cart/show', { withCredentials: true }).then(response => {
            console.log(response.data)
            dispatch({
                type: ACTIONS.FETCH_CART_ITEM,
                products: []
            })
        })
    }
}

export const cartCheckout = () => {
    return dispatch => {
        axios.post('/user/cart/checkout', { withCredentials: true }).then(response => {
            console.log(response.data)
            dispatch({
                type: ACTIONS.CART_CHECKOUT
            })
        })
    }
}