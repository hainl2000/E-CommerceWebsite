import {
    Button,
    Modal,
    Container,
    Typography,
    FormControl,
    TextField,
    InputAdornment
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import Inbox from "../Components/Inbox/Admin/index"
import { loginErrorSelector } from '../Selectors/ui.selector'
import { loginStatusSelector, roleSelector } from '../Selectors/user.selector'
import { useStyles } from "./style";
import { getLoginStatus, login } from '../Actions/user.action';
import { receiveMessagesData, fetchRooms } from '../Actions/admin.action';
import { socket } from "../socket";
import NavBar from "../Components/Navbar";

const Admin = () => {
    const dispatch = useDispatch()

    const errorLogin = useSelector(loginErrorSelector)
    const loginStatus = useSelector(loginStatusSelector)
    const role = useSelector(roleSelector)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)

    const classes = useStyles()

    const loginHandle = () => {
        dispatch(login(email, password))
    }

    const passwordVisibleHandle = () => {
        setVisible(visible => !visible)
    }

    useEffect(() => {
        if (role === 0)
        {
            dispatch(fetchRooms())
        }else{
            console.log('get')
            dispatch(getLoginStatus())
        }
    }, [role])

    useEffect(() => {
        socket.on('messagesLoaded', data => {
            console.log(data.Msgs)
            dispatch(receiveMessagesData(data.Msgs))
        })
    }, [socket])

    return (
        <>
            <NavBar/>
            <Inbox/>
            <Modal
                open={role !== 0}
            >
                <Container className={classes.loginModalContainer}>
                    <Typography className={classes.modalTitle} variant='h4'>
                        Đăng nhập
                    </Typography>
                    <FormControl className={classes.loginForm}>
                        <TextField
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='email'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <MailIcon/>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            type={visible ? 'text' : 'password'}
                            value={password}
                            placeholder='password'
                            onChange={e => setPassword(e.target.value)}
                            onKeyUp={e => {
                                if (e.key === 'Enter')
                                    loginHandle()
                            }}
                            InputProps={
                                {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            {visible ?
                                            <VisibilityIcon className={classes.eyeIcon} onClick={passwordVisibleHandle}/> :
                                            <VisibilityOffIcon className={classes.eyeIcon} onClick={passwordVisibleHandle}/>}
                                        </InputAdornment>
                                    )
                                }
                            }
                        />
                    </FormControl>
                    <Button className={classes.loginButton} variant='contained' onClick={loginHandle}>Đăng nhập</Button>
                    {!loginStatus && errorLogin && <Typography className={classes.errorMessage}>
                        Đăng nhập không thành công
                    </Typography>}
                </Container>
            </Modal>
        </>
    )
}

export default Admin