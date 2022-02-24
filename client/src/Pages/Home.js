import NavBar from '../Components/Navbar'
import CategoryList from '../Components/CategoryList'
import { useEffect } from 'react'
import { fetchCategory } from '../Actions/categoryActions'
import { useDispatch } from 'react-redux'
import { fetchProducts, selectProduct } from '../Actions/productActions'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategory())
        dispatch(fetchProducts())
        dispatch(selectProduct(null))
    }, [])

    return (
        <>
            <NavBar/>
            <CategoryList/>   
        </>
    )
}

export default Home