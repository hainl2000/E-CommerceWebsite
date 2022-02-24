import {
    Box,
    Divider,
    Typography
} from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsByCategory, searchProduct } from "../../Actions/productActions"
import { selectCategory } from "../../Actions/categoryActions"
import ProductItem from "./ProductItem"
import { useStyles } from './style'
import { useParams } from "react-router"
import { activeProductsByCategorySelector, searchProductsSelector } from "../../Selectors/productSelector"
import { selectedCategorySelector } from "../../Selectors/categorySelector"
import { productTitleSelector, viewTypeSelector } from "../../Selectors/uiSelector"

const ProductList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const products = useSelector(activeProductsByCategorySelector)
    const searchProducts = useSelector(searchProductsSelector)
    const category = useSelector(selectedCategorySelector)
    const productTitle = useSelector(productTitleSelector)
    const viewType = useSelector(viewTypeSelector)

    const { id } = useParams()

    useEffect(() => {
        if (id)
        {
            dispatch(selectCategory(id))
            dispatch(fetchProductsByCategory(id))
        }
    }, [])

    const getTitle = () => {
        if (viewType === 'products')
            return products
        
        if (viewType === 'search')
            return searchProducts

        return products
    }

    return (
        <Box className={classes.container}>
            <Typography variant="h6">{productTitle} ({getTitle().length})</Typography>
            <Divider/>
            <Box className={classes.productList}>
                {getTitle().map(product => <ProductItem key={product._id} product={product}/>)}
            </Box>
        </Box>
    )
}

export default ProductList