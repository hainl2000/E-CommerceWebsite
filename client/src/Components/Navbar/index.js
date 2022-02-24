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
import Inbox from './Inbox';
import { useStyles } from './style';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { productsCartSelector } from '../../Selectors/cartSelector';
import { searchProduct } from '../../Actions/productActions';
import { updateLoginError, updateProductsTitle, updateViewType } from '../../Actions/uiActions';
import { loginStatusSelector } from '../../Selectors/userSelector';
import { modalNavberSelector, usernameSelector } from '../../Selectors/uiSelector'
import { signout } from '../../Actions/userActions';

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
    const [openDrawer, setOpenDrawer] = useState(false)
    const [endTextEl, setEndTextEl] = useState(null)
    const [missTextCount, setMissTextCount] = useState(0)
    const endText = useRef(null)
    const top = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector(productsCartSelector)
    const modalType = useSelector(modalNavberSelector)
    const login = useSelector(loginStatusSelector)
    const username = useSelector(usernameSelector)

    //test
    const [openModal, setOpenModal] = useState(false)

    const closeModalHandle = () => {
        setOpenModal(false)
        dispatch(updateLoginError(false))
    }
    //

    const searchClickHandle = () => {
        dispatch(searchProduct(searchValue))
        dispatch(updateProductsTitle(`Result for '${searchValue}'`))
        dispatch(updateViewType('search'))
        setSearchValue('')
        navigate('/category')
    }

    const handleClose = () => {
        dispatch(signout())
        setAnchorEl(null)
    }

    const avatarClickHandle = e => {
        setAnchorEl(e.currentTarget)
    }

    const getModal = () => {
        if (modalType === 'login')
            return <LoginModal open={openModal} closeHandle={closeModalHandle}/>
        else
            return <SignUpModal open={openModal} closeHandle={closeModalHandle}/>
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
                    <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu' onClick={() => navigate('/')}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        App
                    </Typography>
                    <Box className={classes.formContainer}>
                        <FormControl>
                            <TextField
                                variant='outlined'
                                size='small'
                                placeholder='Search...'
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === 'Enter')
                                        searchClickHandle()
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <SearchIcon
                                                className={classes.searchButton}
                                                onClick={searchClickHandle}
                                            />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box component="div" className={classes.buttonContainer}>
                        {login && 
                        <IconButton onClick={() => {
                            setOpenDrawer(true)
                            setMissTextCount(0)
                        }}>
                            <Badge badgeContent={missTextCount} color='secondary'>
                                <HelpIcon />
                            </Badge>
                        </IconButton>}
                        <IconButton onClick={() => navigate('/cart/1')}>
                            <Badge badgeContent={products.length} color='secondary'>
                                <ShoppingCartIcon className={login ? classes.cartIcon : classes.cartIcon_extend}/>
                            </Badge>
                        </IconButton>
                        {login ? <Avatar className={classes.avatar} onClick={e => avatarClickHandle(e)}>{username.toUpperCase()[0]}</Avatar> : <Button className={classes.button} onClick={() => setOpenModal(true)} color='inherit'>Đăng nhập</Button>}
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
            <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Inbox/>
            </Drawer>
            {getModal()}
            <IconButton className={classes.scrollToTopButton} onClick={() => top.current.scrollIntoView()}>
                <ArrowUpwardIcon fontSize='large'/>
            </IconButton>
        </div>
    )
}

export default NavBar