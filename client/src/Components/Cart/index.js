import {
    Box,
    Typography,
    Divider,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    TableCell,
    TableBody,
    Select,
    MenuItem,
    FormControl,
    Button,
} from '@material-ui/core'
import { columns } from './columns';
import { useState } from 'react';
import { shipping } from './data';
import { useStyles } from './style';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { productsCartSelector } from '../../Selectors/cartSelector';

const Cart = () => {
    const classes = useStyles()
    const [shippingValue, setShippingValue] = useState(1)
    const products = useSelector(productsCartSelector)

    const getTotal = () => {
        return products.reduce((current, next) => {
            return current + next.price * next.quantity
        }, 0)
    }

    return (
        <Box component='div' className={classes.root}>
            <Box className={classes.cartItem}>
                <Box className={classes.cartHeader}>
                    <Typography variant='h5'>
                        Đơn hàng
                    </Typography>
                    <Typography variant='h5'>
                        {products.length} sản phẩm
                    </Typography>
                </Box>
                <Divider/>
                <Box className={classes.dataContainer}>
                    <TableContainer className={classes.table}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                        >
                                            {column.name.toUpperCase()}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((item, index) => {
                                    return (
                                        <CartItem key={index} item={item} index={index}/>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <Box className={classes.payment}>
                <Box>
                    <Typography variant='h5' className={classes.cartHeader}>
                        Thanh toán
                    </Typography>
                </Box>
                <Divider/>
                <Box className={classes.totalPaymentInfo}>
                    <Typography>
                        Số sản phẩm: {products.length}
                    </Typography>
                    <Typography>
                        Tổng tiền: {Intl.NumberFormat().format(getTotal())} VND
                    </Typography>
                </Box>
                <Typography variant='h6'>Vận chuyển</Typography>
                <Box className={classes.shippingInfo}>
                    <FormControl variant='outlined' className={classes.formControl}>
                        <Select
                            value={shippingValue}
                            onChange={e => setShippingValue(e.target.value)}
                        >
                            {shipping.map(shippingMethod =>
                            <MenuItem key={shippingMethod.id} value={shippingMethod.id}>
                                {shippingMethod.name}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    <Typography>
                        Phí vận chuyển: {Intl.NumberFormat().format(shipping[shippingValue - 1].price)} VND
                    </Typography>
                </Box>
                <Divider/>
                <Box className={classes.total}>
                    <Typography>Tổng tiền:</Typography>
                    <Typography>{products.length !== 0 ? Intl.NumberFormat().format(getTotal() + shipping[shippingValue -1].price) : 0} VND</Typography>
                </Box>
                <Box className={classes.payButton}>
                    <Button variant='contained' color='secondary'>Thanh toán</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Cart