import React, { useContext } from 'react';
import { CartContext } from '../../../App';
import './AddedFood.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
const AddedFood = () => {
    const [cartItem, setCartItem] = useContext(CartContext);
    const triggerToast = (value) => {
        toast.success(`Item ${value}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide,
            theme: "light",
        });
    }
    // function for increase quantity and decrease quantity
    const handleQuantity = (item, sign) => {
        if (sign === '+') {
            const exists = cartItem.find(items => items.id === item.id);
            triggerToast("quantity increased");
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
                triggerToast("removed");
            }
            else if (exists && exists.quantity >= 1) {
                const existCart = cartItem.map(food => food.id === item.id ? { ...exists, quantity: exists.quantity - 1 } : food);
                setCartItem(existCart);
                triggerToast("quantity decreased");
            }
        }
    }
    return (
        <>
            <ToastContainer toastStyle={{ backgroundColor: "rgb(34, 40, 49)", color: "white" }} />
            {
                cartItem.map(added => <div className='display-addedFood'
                    key={added.id}>
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