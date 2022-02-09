import {
    useState,
    useRef,
    useEffect
} from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    TextField,
    FormControl,
    Box,
    Badge,
    Avatar,
    withStyles,
    InputAdornment,
    Menu,
    MenuItem,
    Drawer
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HelpIcon from '@material-ui/icons/Help';
import { LoginModal, SignUpModal } from '../MyModal';
// import Inbox from './Inbox';
import { useStyles } from './style';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginError, updateProductsTitle, updateViewType } from '../../Actions/ui.action';
import { loginStatusSelector } from '../../Selectors/user.selector';
import { modalNavberSelector, usernameSelector } from '../../Selectors/ui.selector'
import { signout } from '../../Actions/user.action';

const StyledMenu = withStyles({
    paper: {

    }
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        {...props}
    />
))

const NavBar = () => {
    const classes = useStyles()
    const [searchValue, setSearchValue] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const [endTextEl, setEndTextEl] = useState(null)
    const endText = useRef(null)
    const top = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = useSelector(loginStatusSelector)
    const username = useSelector(usernameSelector)
    const [openModal, setOpenModal] = useState(false)
    const modalType = useSelector(modalNavberSelector)

    const handleClose = () => {
        dispatch(signout())
        setAnchorEl(null)
    }

    const closeModalHandle = () => {
        setOpenModal(false)
        dispatch(updateLoginError(false))
    }

    const avatarClickHandle = e => {
        setAnchorEl(e.currentTarget)
    }

    const getModal = () => {
        if (modalType === 'login')
            return <LoginModal open={!login} closeHandle={closeModalHandle}/>
        else
            return <SignUpModal open={!login} closeHandle={closeModalHandle}/>
    }

    useEffect(() => {
        endText.current?.scrollIntoView()
    }, [endTextEl])

    useEffect(() => {
        if (login)
            setOpenModal(false)
    }, [login])

    return (
        <div ref={top} className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        Hỗ trợ khách hàng
                    </Typography>
                    <Box component="div" className={classes.buttonContainer}>
                        <Avatar className={classes.avatar} onClick={e => avatarClickHandle(e)}>{username.toUpperCase()[0]}</Avatar>
                        <StyledMenu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem className={classes.menuItem} onClick={handleClose}>Đăng xuất</MenuItem>
                        </StyledMenu>
                    </Box>
                </Toolbar>
            </AppBar>
            {/* <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Inbox/>
            </Drawer> */}
            {getModal()}
        </div>
    )
}

export default NavBar