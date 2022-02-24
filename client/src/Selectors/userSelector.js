import { createSelector } from 'reselect'

const getMessages = state => state.userReducer.messages
const getLoginStatus = state => state.userReducer.login
const getRole = state => state.userReducer.role

export const messagesSelector = createSelector(
    getMessages,
    messages => messages
)

export const loginStatusSelector = createSelector(
    getLoginStatus,
    status => status
)

export const roleSelector = createSelector(
    getRole,
    role => role
)