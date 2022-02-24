import { constance as ACTIONS } from "../constance"

const initialState = {
    categories: [],
    selected_category: null
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case ACTIONS.FETCH_CATEGORY:
            return {
                ...state,
                categories: action.categories
            }

        case ACTIONS.SELECT_CATEGORY:
            return {
                ...state,
                selected_category: action.id
            }

        default: return state
    }
}