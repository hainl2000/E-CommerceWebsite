import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { getLoginStatus } from './Actions/user.action';
import './App.css';
import Admin from './Screens/admin';
import User from './Screens/user';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLoginStatus())
    }, [])

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' exact element={<User/>}/>
                    <Route path='/admin' exact element={<Admin/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
