import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Admin, User } from './Role'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { fetchCategory } from './Actions/categoryActions'
import { fetchProducts } from './Actions/productActions'
import { getLoginStatus } from './Actions/userActions';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategory())
        dispatch(fetchProducts())
        dispatch(getLoginStatus())
    }, [])

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' exact element={<User type='home'/>}/>
                    <Route path='/cart/:id' exact element={<User type='cart'/>}/>
                    <Route path='/category/:id' exact element={<User type='category'/>}/>
                    <Route path='/category' exact element={<User type='category'/>}/>
                    <Route path='/product/:id' exact element={<User type='product'/>}/>
                    <Route path='/admin' exact element={<Admin/>}/>
                </Routes>
            </Router>
            {/* <NavBar/> */}

            {/* <CategoryList/> */}
            {/* <Cart/> */}
            {/* <ProductInfo/> */}
            {/* <ProductList/> */}
            {/* <Admin/> */}

            {/* <IconButton className={classes.scrollToTopButton} onClick={() => top.current.scrollIntoView()}>
                <ArrowUpwardIcon fontSize='large'/>
            </IconButton> */}
            {/* <Footer/> */}
        </div>
    );
}

export default App;
