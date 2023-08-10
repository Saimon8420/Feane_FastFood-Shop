import React, { useContext, useEffect, useState } from 'react';
import './ShippingInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { CartContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { orders } from '../../../features/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
const ShippingInfo = ({ total }) => {
    const userData = useSelector((state) => state.auth);
    const [cartItem, setCartItem] = useContext(CartContext);
    const [pickUp, setPickup] = useState(true);
    const [homeDelivery, setHomeDelivery] = useState(false);
    const [orderType, setOrderType] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [orderStatus, setOrderStatus] = useState("");
    const orderItems = cartItem.map((each) => { return { itemName: each.name, quantity: each.quantity } });
    const orderDate = new Date().getTime();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (pickUp && !homeDelivery) {
            setOrderType("");
            setOrderType("self collect");
            setTotalAmount(total);
            setOrderStatus("delivered");
        }
        if (!pickUp && homeDelivery) {
            setOrderType("");
            setOrderType("home delivery");
            setTotalAmount(total + 5);
            setOrderStatus("pending");
        }
    }, [pickUp, homeDelivery, total])

    const triggerToast = () => {
        toast.success("Order Confirmed", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000, //1 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide,
            theme: "light",
        });
    }
    const [trigger, setTrigger] = useState(false);
    const handleConfirm = async () => {
        if (window.confirm("Confirm Order?")) {
            const orderDetails = { orderItems, date: orderDate, status: orderStatus, type: orderType, userId: userData?.login[0]?.userId, total: totalAmount };
            dispatch(orders(orderDetails));
            triggerToast();
            setCartItem([]);
            setTrigger(true);
        }
        else {
            window.alert("Cancel Order");
        }
    }
    useEffect(() => {
        if (trigger && userData?.orderSuccess?.[0]) {
            setTimeout(() => {
                toast.success(`${userData?.orderSuccess[0]}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition: Slide,
                    theme: "light",
                })
            }, 2000);
            setTimeout(() => {
                navigate("/home");
            }, 5000);
        }
    }, [userData, navigate, trigger]);

    console.log(userData);
    return (
        <div className='shippingInfo-container'>
            <ToastContainer toastStyle={{ backgroundColor: "rgb(34, 40, 49)", color: "white" }} />
            <div className='display-delivery'>
                <div className='choice'>
                    <h5>Delivery Options:</h5>
                    <h6>Current Chosen Option</h6>
                    <button className={pickUp ? "activeBtn" : "inactive"} onClick={() => { setPickup(!pickUp); setHomeDelivery(!homeDelivery); }}>Self Pickup <FontAwesomeIcon icon={faCircleXmark} /></button>

                    <button className={homeDelivery ? "activeBtn" : "inactive"} onClick={() => { setHomeDelivery(!homeDelivery); setPickup(!pickUp) }}>Home Delivery <FontAwesomeIcon icon={faCircleXmark} /></button>
                </div>
                {
                    homeDelivery &&
                    <div className='grandTotal'>
                        <h6>Delivery Charge: $5</h6>
                        <h6>Sub total: ${total}</h6>
                        <hr />
                        <h6>Grand total: ${total + 5}</h6>
                    </div>
                }
            </div>

            {homeDelivery && <h4>Shipping Info</h4>
            }
            <br />
            <div className='shipping-form'>
                {
                    homeDelivery &&
                    <div className='form'>
                        <span>Name*<input type="text" name='name_info'
                            value={userData?.login[0]?.name}
                            disabled />
                        </span>

                        <span>Phone*<input type="tel" name="phone_info" id="" value={userData?.login[0].phone}
                            disabled />
                        </span>

                        <span>Email*<input type="email" name="email" id="" value={userData?.login[0]?.email}
                            disabled />
                        </span>

                        <span>Address* <input name="address_info" id="" value={userData?.login[0]?.address}
                            disabled></input>
                        </span>
                    </div>
                }

                <button onClick={() => handleConfirm()}>Confirm Order</button>
            </div>
        </div>
    );
};

export default ShippingInfo;