import { constance as ACTIONS } from "../constance"

export const addIntoCart = (product) => {
    return {
        type: ACTIONS.ADD_INTO_CART,
        product
    }
}

export const discardFromCart = (product) => {
    return {
        type: ACTIONS.DISCARD_FROM_CART,
        product
    }
}

export const discardFromCartAll = (product) => {
    return {
        type: ACTIONS.DISCARD_FROM_CART_ALL,
        product
    }
}