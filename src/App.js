import './App.css';
import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header/Header';
import Home from './pages/Home/Home';
import Footer from './pages/Footer/Footer';
import Cart from './pages/Cart/Cart';
import ShippingInfo from './pages/Cart/ShippingInfo/ShippingInfo';

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

            <Route path='/home/cart' element={<Cart />}></Route>

            <Route></Route>
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
