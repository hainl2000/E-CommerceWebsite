import {
    Avatar,
    Box,
    Button,
    Modal,
    Tab,
    Tabs,
    Container,
    Typography,
    FormControl,
    TextField,
    InputAdornment
} from "@material-ui/core"
import { useEffect, useState } from "react"
import { useStyles } from "./style";
import ProductList from "./ProductList";
import AdminModal from "./Modals/AdminModal";

import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import { product_data } from '../Cart/data';
import Inbox from "./Inbox";

import { loginStatusSelector, roleSelector } from '../../Selectors/userSelector'
import { loginErrorSelector } from '../../Selectors/uiSelector'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../Actions/userActions';
import { fetchRooms } from "../../Actions/adminActions";
import { getLoginStatus, signout } from '../../Actions/userActions'
import CategoryList from "./CategoryList";

const Admin = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState('view')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)

    const errorLogin = useSelector(loginErrorSelector)
    const loginStatus = useSelector(loginStatusSelector)
    const role = useSelector(roleSelector)

    const changeHandle = (e, newValue) => setValue(newValue)

    const passwordVisibleHandle = () => {
        setVisible(visible => !visible)
    }

    const loginHandle = () => {
        dispatch(login(email, password))
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        if (role === 0)
        {
            dispatch(fetchRooms())
        }else{
            dispatch(getLoginStatus())
        }
    }, [role])

    const logOutHandle = () => {
        dispatch(signout())
    }

    const getPanel = () => {
        switch (value)
        {
            case 0:
                return <ProductList setOpenModal={setOpenModal} setModalType={setModalType} />

            case 1:
                return <CategoryList setOpenModal={setOpenModal} setModalType={setModalType} />

            case 2:
                return <Inbox/>
            
            default: return null
        }
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.admin_navbar}>
                <Tabs
                    className={classes.tabs}
                    orientation="horizontal"
                    value={value}
                    onChange={changeHandle}
                >
                    <Tab label='Product'/>
                    <Tab label='Category'/>
                    <Tab label='Chăm sóc khách hàng'/>
                </Tabs>
                <Box className={classes.admin_action}>
                    <Avatar className={classes.admin_avatar}>A</Avatar>
                    <Button color='secondary' variant='contained' size="small" onClick={logOutHandle}>Đăng xuất</Button>
                </Box>
            </Box>
            <Box className={classes.panelContainer}>
                {getPanel()}
                {/* <Inbox/>
                <ProductList setOpenModal={setOpenModal} setModalType={setModalType}/> */}
            </Box>
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
            <AdminModal view={modalType === 'view'} edit={modalType === 'edit'} add={modalType === 'add'} open={openModal} setOpen={setOpenModal}/>
        </Box>
    )
}

export default Admin