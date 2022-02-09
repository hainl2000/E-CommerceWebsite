import Inbox from "../Components/Inbox/User/index"
import NavBar from "../Components/Navbar"
import { socket } from '../socket'
import { useDispatch } from 'react-redux'
import { receiveMessagesData, fetchMessages, receiveMessage } from "../Actions/user.action"
import { useSelector } from "react-redux"
import { userIdSelector } from "../Selectors/ui.selector"
import { useEffect } from "react"

const User = () => {
    const dispatch = useDispatch()
    const userId = useSelector(userIdSelector)

    // useEffect(() => {
    //     socket.on('messagesLoaded', data => {
    //         dispatch(receiveMessagesData(data))
    //     })

    //     return () => {
    //         socket.off('messagesLoaded')
    //     }
    // }, [socket])

    useEffect(() => {
        fetchMessages({ roomId: userId })
    }, [userId])
    return (
        <>
            <NavBar/>
            <Inbox/>
        </>
    )
}

export default User