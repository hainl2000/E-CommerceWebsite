import {
    Box,
    Paper,
    Typography,
    Divider,
    Button
} from "@material-ui/core"
import {
    Rating
} from "@material-ui/lab"
import StarIcon from '@material-ui/icons/Star'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useNavigate } from 'react-router';
import { useStyles } from "./style";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectedProductSelector } from "../../Selectors/productSelector";
import { selectProduct } from "../../Actions/productActions";
import { addIntoCart } from "../../Actions/cartActions";

const ProductInfo = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const navigate = useNavigate()
    const [rating, setRating] = useState(5)
    const { id } = useParams()
    const product = useSelector(selectedProductSelector)

    useEffect(() => {
        dispatch(selectProduct(id))
    }, [])

    const addIntoCartHandle = () => {
        dispatch(addIntoCart(product))
    }

    const addIntoCartRushHandle = () => {
        addIntoCartHandle()
        navigate('/cart/1')
    }

    return (
        <Box>
            <Paper elevation={10} className={classes.paper}>
                <Box>
                    <img src={product.imageURL} width={400} height={400} alt='product'/>
                    <Box className={classes.gallery}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item =>
                            <img key={item} src={product.imageURL} width={100} height={100} alt='product'/>)}
                    </Box>
                </Box>
                <Box className={classes.rightPanel}>
                    <Typography variant="h4">
                        {product.nameProduct}
                    </Typography>
                    <Box className={classes.rating}>
                        <Typography>Đánh giá: </Typography>
                        <StarIcon className={classes.startIcon}/>
                        <Typography>4.5</Typography>
                        <Divider orientation="vertical" flexItem/>
                        <Rating name="productRating" value={rating}/>
                    </Box>
                    <Box>
                        <Typography className={classes.price}>{Intl.NumberFormat().format(product.price)} $</Typography>
                        <Divider/>
                        <Typography className={classes.description}>Mô tả:</Typography>
                        <Typography className={classes.description}>
                            {product.description}
                        </Typography>
                    </Box>
                    <Box className={classes.buttonContainer}>
                        <Divider/>
                        <Button variant="contained" color="secondary" onClick={addIntoCartHandle}>
                            <Typography className={classes.buttonText}>Thêm vào giỏ hàng</Typography>
                            <AddShoppingCartIcon/>
                        </Button>

                        <Button variant="contained" color="primary" onClick={addIntoCartRushHandle}>
                            <Typography className={classes.buttonText}>Đặt hàng nhanh</Typography>
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default ProductInfo