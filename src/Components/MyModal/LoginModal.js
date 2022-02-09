import {
    Container,
    Modal,
    Typography,
    FormControl,
    TextField,
    Button,
    InputAdornment
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MailIcon from '@material-ui/icons/Mail';
import { useEffect, useState } from 'react';
import { useStyles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginError, updateNavbarModal } from '../../Actions/ui.action';
import { login } from '../../Actions/user.action';
import { loginStatusSelector } from '../../Selectors/user.selector';
import { loginErrorSelector } from '../../Selectors/ui.selector';

const LoginModal = ({open, closeHandle}) => {
    const classes = useStyles()
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const loginStatus = useSelector(loginStatusSelector)
    const errorLogin = useSelector(loginErrorSelector)

    const passwordVisibleHandle = () => {
        setVisible(visible => !visible)
    }

    const switchModalHandle = () => {
        dispatch(updateNavbarModal('singup'))
        dispatch(updateLoginError(false))
    }

    const loginHandle = () => {
        dispatch(login(email, password))
    }

    const closeModalHandle = () => {
        setEmail('')
        setPassword('')
        closeHandle()
    }
    
    return (
        <Modal
            open={open}
            onClose={closeModalHandle}
        >
            <Container className={classes.modalContainer}>
                <Typography className={classes.modalTitle} variant='h4'>
                    Đăng nhập
                </Typography>
                <FormControl className={classes.form}>
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
                <Typography className={classes.switchModalLink} onClick={switchModalHandle}>
                    Tạo tài khoản
                </Typography>
            </Container>
        </Modal>
    )
}

export default LoginModal