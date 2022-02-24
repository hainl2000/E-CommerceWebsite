import {
    Box,
    Typography,
    Divider
} from "@material-ui/core"
import ProductItem from "../Product/ProductItem"
import { useNavigate } from 'react-router';
import { useStyles } from "./style";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProductsTitle, updateViewType } from "../../Actions/uiActions";

const Category = ({ categoryName = 'Category', products = [], id }) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const moreHandle = () => {
        dispatch(updateProductsTitle(categoryName))
        dispatch(updateViewType('products'))
        navigate(`/category/${id}`)
    }

    return (
        <>
            <Box component='div' className={classes.category}>
                <Box component='div' className={classes.title}>
                    <Typography variant="h6">
                        {categoryName} ({products.length})
                    </Typography>
                    <Typography onClick={moreHandle}>
                        Xem thêm
                    </Typography>
                </Box>
                <Box component='div' className={classes.categoryItem}>
                    {products.map(product => <ProductItem key={product._id} product={product}/>)}
                </Box>
            </Box>
            <Divider/>
        </>
    )
}

export default Category