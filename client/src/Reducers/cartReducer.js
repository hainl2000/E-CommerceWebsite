import { constance as ACTIONS } from "../constance"

const initialState = {
    products: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case ACTIONS.ADD_INTO_CART:
            const products = [...state.products]
            const _product = products.find(_product_ => _product_._id === action.product._id)

            if (_product)
            {
                _product.quantity += 1
                return {
                    ...state,
                    products: products
                }
            }else{
                const newProducts = [...state.products, {...action.product, quantity: 1}]
            
                return {
                    ...state,
                    products: newProducts
                }
            }

        case ACTIONS.DISCARD_FROM_CART:
            const newProducts = [...state.products]
            const discardProduct = newProducts.find(product => product._id === action.product._id)

            if (discardProduct)
            {
                discardProduct.quantity -= 1

                if (discardProduct.quantity === 0)
                {
                    return {
                        ...state,
                        products: [...newProducts.filter(product => product._id !== action.product._id)]
                    }
                }
            }

            return {
                ...state,
                products: newProducts
            }

        case ACTIONS.DISCARD_FROM_CART_ALL:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.product._id)
            }

        default: return state
    }
}