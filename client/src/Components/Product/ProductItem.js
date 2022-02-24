import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography
} from "@material-ui/core";
import { Rating } from '@material-ui/lab';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useNavigate } from 'react-router';
import { useStyles } from "./style";
import { useDispatch } from 'react-redux';
import { addIntoCart } from "../../Actions/cartActions";

const ProductItem = ({product = {}}) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addIntoCartHandle = () => {
        dispatch(addIntoCart(product))
    }

    return (
        <Card elevation={3} className={classes.cardItem}>
            <CardMedia
                className={classes.media}
                image={product.imageURL}
                title="product"
                onClick={() => navigate(`/product/${product._id}`)}
            />
            <CardContent className={classes.content} onClick={() => navigate(`/product/${product._id}`)}>
                <Typography variant='h6'>
                    {product.nameProduct}
                </Typography>
                <Typography className={classes.itemPrice} variant='h6'>
                    {Intl.NumberFormat().format(product.price)} $
                </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableSpacing>
                <Rating className={classes.productRating} value={3} readOnly/>
                <AddShoppingCartIcon onClick={addIntoCartHandle}/>
            </CardActions>
        </Card>
    )
}

export default ProductItem