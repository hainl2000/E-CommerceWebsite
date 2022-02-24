import { Box } from "@material-ui/core"
import Category from "./Category"
import { useSelector } from 'react-redux'
import { activeProductsByCategoriesSelector } from "../../Selectors/productSelector"
import { useEffect } from "react"

const CategoryList = () => {
    const productsByCategories = useSelector(activeProductsByCategoriesSelector)
    
    return (
        <Box>
            {productsByCategories.map(category => {
                return (
                    <Category key={category.id} categoryName={category.category_name} id={category.id} products={category.products}/>
                )
            })}
        </Box>
    )
}

export default CategoryList