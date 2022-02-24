import { createSelector } from 'reselect'

const getRoomList = state => state.adminReducer.rooms
const getCurrentRoom = state => state.adminReducer.currentRoom
const getMessages = state => state.adminReducer.conversations
const getSelectedProduct = state => state.adminReducer.product

export const roomListSelector = createSelector(
    getRoomList,
    rooms => rooms
)

export const currentRoomSelector = createSelector(
    getCurrentRoom,
    room => room
)

export const messagesSelector = createSelector(
    getMessages,
    messages => messages
)

export const productSelector = createSelector(
    getSelectedProduct,
    product => product
)