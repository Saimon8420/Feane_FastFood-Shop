import './App.css';
import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header/Header';
import Home from './pages/Home/Home';
import Footer from './pages/Footer/Footer';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './pages/Protected/ProtectedRoute';
import Profile from './Profile/Profile';

const CartContext = createContext([]);
function App() {
  const [cartItem, setCartItem] = useState([]);
  return (
    <CartContext.Provider value={[cartItem, setCartItem]}>

      <div className="display">
        <div className='header'>
          <Header></Header>
        </div>
        <div>
          <Routes>
            <Route path='/' element={<Home />}
            ></Route>

            <Route path='/home' element={<Home />}
            ></Route>

            <Route path='/home/cart' element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }></Route>

            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }></Route>

            <Route path='/login' element={<Login />}></Route>

            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </CartContext.Provider>
  );
}

export { App, CartContext };
