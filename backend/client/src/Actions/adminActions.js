import { constance as ACTIONS } from '../constance'
import axios from 'axios'
import { socket } from '../socket'

export const fetchRooms = () => {
    return dispatch => {
        axios.get('/room/getRoomList', { withCredentials: true })
        .then(response => {
            dispatch({
                type: ACTIONS.ADMIN_FETCH_ROOMS,
                rooms: response.data.roomList
            })
            return response.data.roomList
        }).then(result => {
            dispatch({
                type: ACTIONS.ADMIN_SELECT_ROOM,
                currentRoom: result[0]
            })
            return result[0]
        }).then((result) => {
            socket.emit('loadMsg', result)
        }).catch(() => {})
    }
}

export const receiveMessagesData = (messages) => {
    return {
        type: ACTIONS.ADMIN_FETCH_MESSAGES,
        messages
    }
}

export const receiveMessage = (message) => {
    return {
        type: ACTIONS.ADMIN_RECEIVE_MESSAGE,
        message: {...message, msg: message.content, userSentID: message.userSentId}
    }
}

export const sentMessage = (text, roomId) => {
    socket.emit('sendNewMsg', { role: 0, msg: text, roomId })
}

export const createProduct = (product) => {
    axios.post('/admin/product/create', product, { withCredentials: true })
    .then(response => console.log(response))
}

export const updateProduct = (product) => {
    axios.post('/admin/product/update', product, { withCredentials: true })
    .then(response => console.log(response))
}

export const removeProduct = (productId) => {
    axios.post('/admin/product/delete', productId, { withCredentials: true })
    .then(response => console.log(response))
}

export const selectRoom = (id) => {
    socket.emit('loadMsg', id)
}

export const switchRoom = (room) => {
    return {
        type: ACTIONS.ADMIN_SELECT_ROOM,
        currentRoom: room
    }
}

export const selectProduct = (product) => {
    return {
        type: ACTIONS.ADMIN_SELECT_PRODUCT,
        product
    }
}