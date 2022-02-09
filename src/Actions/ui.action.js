import { constance as ACTIONS } from "../constance";

export const updateProductsTitle = (title) => {
    return {
        type: ACTIONS.UPDATE_PRODUCT_TITLE,
        title
    }
}

export const updateViewType = (viewType) => {
    return {
        type: ACTIONS.UPDATE_VIEW_TYPE,
        viewType
    }
}

export const updateNavbarModal = (modal) => {
    return {
        type: ACTIONS.UPDATE_NAVBAR_MODAL,
        modal
    }
}

export const updateLoginError = (error) => {
    return {
        type: ACTIONS.LOGIN_RESULT,
        error
    }
}