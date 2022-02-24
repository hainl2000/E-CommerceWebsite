import { Box } from "@material-ui/core"
import { useEffect } from "react"
import { Home, Admin, Cart, Category, ProductInfo } from '../Pages'
import { socket } from '../socket'
import { useDispatch } from 'react-redux'
import { receiveMessagesData, fetchMessages, receiveMessage } from "../Actions/userActions"
import { useSelector } from "react-redux"
import { userIdSelector } from "../Selectors/uiSelector"

const User = ({type = 'home'}) => {
    const dispatch = useDispatch()
    const userId = useSelector(userIdSelector)

    useEffect(() => {
        socket.on('messagesLoaded', data => {
            dispatch(receiveMessagesData(data))
        })

        return () => {
            socket.off('messagesLoaded')
        }
    }, [socket])

    useEffect(() => {
        fetchMessages({ roomId: userId })
    }, [userId])

    const getContent = () => {
        switch (type)
        {
            case 'home':
                return <Home/>

            case 'product':
                return <ProductInfo/>

            case 'admin':
                return <Admin/>

            case 'cart':
                return <Cart/>

            case 'category':
                return <Category/>

            default: return <Home/>
        }
    }

    return (
        <Box>
            {getContent()}
        </Box>
    )
}

export default User