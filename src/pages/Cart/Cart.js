import React, { useContext } from 'react';
import { CartContext } from '../../App';
import './Cart.css';
import ShippingInfo from './ShippingInfo/ShippingInfo';
const Cart = () => {
    const [cartItem, setCartItem] = useContext(CartContext);
    let i = 1;
    let grandTotal;
    //reducer function for calculation total
    const reducer = (x, y) => {
        return x + y;
    }
    // total calculation function with the help of reducer function
    const calc = () => {
        const total = cartItem.map(added => added.price * added.quantity);
        grandTotal = total.reduce(reducer, 0);
    }
    calc();
    return (
        <div className=''>
            <div className='display-bill'>
                <h4>Bill Info</h4>
                <div className='sub-info'>
                    <p>Serial</p>
                    <p>Quantity*Items</p>
                    <p>Total</p>
                </div>
                {
                    cartItem.map(added => <div className='bill-container' key={added.id}>
                        <p>{i++})</p>
                        <p>{added.quantity} X {added.name}</p>
                        <p>${added.quantity * added.price}</p>
                    </div>)
                }
                <h6>Sub Total: ${grandTotal}</h6>
            </div>
            <div className='order-info'>
                <ShippingInfo total={grandTotal} />
            </div>
        </div>
    );
};

export default Cart;