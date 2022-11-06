import React, { useContext } from 'react';
import { CartContext } from '../../../App';
import './AddedFood.css';
const AddedFood = () => {
    const [cartItem, setCartItem] = useContext(CartContext);

    // function for increase quantity and decrease quantity
    const handleQuantity = (item, sign) => {
        if (sign === '+') {
            const exists = cartItem.find(items => items.id === item.id);

            if (exists) {
                const existCart = cartItem.map(food => food.id === item.id ? { ...exists, quantity: exists.quantity + 1 } : food);
                setCartItem(existCart);
            }
        }
        else {
            const exists = cartItem.find(items => items.id === item.id);

            if (exists.quantity === 1) {
                const existCart = cartItem.filter(food => food.id !== item.id);
                setCartItem(existCart);
            }
            else if (exists && exists.quantity >= 1) {
                const existCart = cartItem.map(food => food.id === item.id ? { ...exists, quantity: exists.quantity - 1 } : food);
                setCartItem(existCart);
            }

        }
    }
    return (
        <>
            {
                cartItem.map(added => <div className='display-addedFood'>
                    <img src={added.image} alt="" />
                    <h6>{added.name}</h6>
                    <div className='display-quantity'>
                        <p>
                            <button onClick={() => handleQuantity(added, '+')}>+</button>

                            {added.quantity}

                            <button onClick={() => handleQuantity(added, '-')}>-</button>
                        </p>
                    </div >
                    <p>total: ${added.price * added.quantity}</p>
                </div >)
            }
        </>
    );
};

export default AddedFood;