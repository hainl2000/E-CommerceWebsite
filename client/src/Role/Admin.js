import { Box } from "@material-ui/core"
import { default as AdminPage } from '../Pages/Admin'
import { useEffect } from 'react'
import { socket } from '../socket'
import { useDispatch } from "react-redux"
import { receiveMessagesData } from "../Actions/adminActions"
import { constance as ACTIONS } from '../constance'

const Admin = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('messagesLoaded', data => {
            dispatch(receiveMessagesData(data.Msgs))
        })
    }, [socket])

    return (
        <Box>
            <AdminPage/>
        </Box>
    )
}

export default Admin