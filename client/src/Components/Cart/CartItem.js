import {
    TableRow,
    TableCell,
    Box,
    IconButton,
    Typography,
    Tooltip
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useStyles } from './style';
import { useDispatch } from 'react-redux';
import { addIntoCart, discardFromCart, discardFromCartAll } from '../../Actions/cartActions';

const CartItem = ({item, index}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const updateHandle = () => {
        dispatch(addIntoCart(item))
    }

    const discardHandle = () => {
        dispatch(discardFromCart(item))
    }

    const discardAllHandle = () => {
        dispatch(discardFromCartAll(item))
    }

    return (
        <TableRow>
            <TableCell>
                <Box className={classes.productInfo}>
                    <img src={item.imageURL} width={100} height={100} alt='phone' />
                    <Box>
                        <Typography variant='h6'>
                            {item.nameProduct}
                        </Typography>
                        <Typography>
                            {item.description}
                        </Typography>
                    </Box>
                </Box>
            </TableCell>
            <TableCell>
                <Box className={classes.quantityCell}>
                    <AddBoxIcon onClick={updateHandle}/>
                    <Typography>
                        {item.quantity}
                    </Typography>
                    <IndeterminateCheckBoxIcon onClick={discardHandle}/>
                </Box>
            </TableCell>
            <TableCell>
                {Intl.NumberFormat().format(item.price)} $
            </TableCell>
            <TableCell>
                {Intl.NumberFormat().format(item.quantity * item.price)} $
            </TableCell>
            <TableCell>
                <IconButton onClick={discardAllHandle}>
                    <Tooltip title="Discard item">
                        <DeleteForeverIcon/>
                    </Tooltip>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default CartItem