import { constances as ACTIONS } from "../constances";

const initialState = {
    rooms: [],
    currentRoom: [],
    messages: []
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case ACTIONS.ADMIN_FETCH_ROOMS:
            return {
                ...state,
                rooms: action.rooms
            }

        case ACTIONS.ADMIN_SELECT_ROOM:
            return {
                ...state,
                currentRoom: action.currentRoom
            }

        case ACTIONS.ADMIN_FETCH_MESSAGES:
            return {
                ...state,
                conversations: action.messages
            }

        case ACTIONS.ADMIN_RECEIVE_MESSAGE:
            return {
                ...state,
                conversations: [...state.conversations, action.message]
            }
            
        default: return state
    }
}