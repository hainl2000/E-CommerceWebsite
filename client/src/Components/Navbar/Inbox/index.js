import {
    Box,
    FormControl,
    TextField,
    InputAdornment,
    Typography,
    Paper
} from '@material-ui/core'
import { useState, useRef, useEffect } from 'react'
import SendIcon from '@material-ui/icons/Send';
import { useStyles } from '../style';
import { useDispatch, useSelector } from "react-redux";
import { messagesSelector } from '../../../Selectors/userSelector';
import { receiveMessage, sentMessage } from '../../../Actions/userActions';
import { userIdSelector } from '../../../Selectors/uiSelector'
import { socket } from '../../../socket';

const Inbox = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const endText = useRef(null)
    const [endTextEl, setEndTextEl] = useState(null)
    const [text, setText] = useState('')
    const messages = useSelector(messagesSelector)
    const userId = useSelector(userIdSelector)
    
    useEffect(() => {
        endText.current?.scrollIntoView({ behavior: 'smooth' })
    }, [endTextEl])

    const submitHandle = () => {
        sentMessage(text)
        setText('')
    }

    useEffect(() => {
        socket.on('msgSent', data => {
            dispatch(receiveMessage(data.result))
            endText.current?.scrollIntoView({ behavior: 'smooth' })
        })
        
        socket.on('newMsgReceived', data => {
            dispatch(receiveMessage(data.result))
            endText.current?.scrollIntoView({ behavior: 'smooth' })
        })

        return () => {
            socket.off('msgSent')
            socket.off('newMsgReceived')
        }
    }, [socket])

    return (
        <Box className={classes.drawer}>
            <Typography variant='h5'>Trợ giúp</Typography>
            <Paper elevation={5} className={classes.textContainer}>
                {messages.map((textItem, index) => {
                    return (
                        <Box key={index} className={userId === textItem.userSentID ? classes.textBubble_customer : classes.textBubble_admin}>
                            <Typography>
                                {textItem.msg}
                            </Typography>
                            <Typography>
                                {textItem.sendAt}
                            </Typography>
                        </Box>
                    )
                })}
                <div ref={el => {endText.current = el; setEndTextEl(el)}}/>
            </Paper>
            <FormControl className={classes.inboxForm}>
                <TextField
                    variant='outlined'
                    size='small'
                    value={text}
                    placeholder='...'
                    onChange={e => setText(e.target.value)}
                    onKeyUp={e => {
                        if (e.key === 'Enter')
                            submitHandle()
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <SendIcon
                                    className={classes.sendIcon}
                                    color='primary'
                                    onClick={submitHandle}
                                />
                            </InputAdornment>
                        )
                    }}
                />
            </FormControl>
        </Box>
    )
}

export default Inbox