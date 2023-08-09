import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { logoutUser, updateProfile } from '../features/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const Profile = () => {
    const userData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState(userData?.login[0]?.name);
    const [email, setEmail] = useState(userData?.login[0]?.email);
    const [password, setPassword] = useState(userData?.login[0]?.password);
    const [phone, setPhone] = useState(userData?.login[0]?.phone);
    const [address, setAddress] = useState(userData?.login[0]?.address);
    const [edit, setEdit] = useState(false);
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        if (edit) {
            toast.success("Profile ready to edit", {
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
    }, [edit])

    const handleUpdate = (e) => {
        e.preventDefault();
        if (window.confirm("Confirm update?")) {
            dispatch(updateProfile({ name: name, email: email, password: password, phone: phone, address: address, userId: userData?.login[0]?.userId }));
            e.target.reset();
            setTrigger(true);
            setEdit(false);
        }
        else {
            window.alert("Cancel update");
        }
    }

    useEffect(() => {
        if (trigger && userData?.updateSuccess[0]) {
            toast.success(userData?.updateSuccess[0], {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
                theme: "light",
            });
        }
    }, [userData, trigger])

    const handleLogout = () => {
        toast.success("Logout Successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide,
            theme: "light",
        });
        setTimeout(() => {
            dispatch(logoutUser());
            navigate("/login");
        }, 2000)
    }
    const allOrders = userData?.orders?.filter((each) => each.userId === userData?.login[0]?.userId);
    let serial = 1;
    return (
        <div>
            <ToastContainer toastStyle={{ backgroundColor: "rgb(34, 40, 49)", color: "white" }} />
            <div className='display-profile'>
                <div>
                    <br />
                    <h3>Profile Details:</h3>
                    <div className='profileDetails'>
                        <form onSubmit={handleUpdate}>
                            <h5><span>Name:</span><input type="text" name="name" id="" value={name} disabled={!edit} onChange={(e) => setName(e.target.value)} /></h5>

                            <h5><span>Password:</span><input type="text" name="password" id="" value={password} disabled={!edit} onChange={(e) => setPassword(e.target.value)} /></h5>

                            <h5><span>Email:</span><input type="email" name="email" id="" value={email} disabled={!edit} onChange={(e) => setEmail(e.target.value)} /></h5>

                            <h5><span>Phone:</span><input type="tel" name="phone" id="" value={phone} disabled={!edit} onChange={(e) => setPhone(e.target.value)} /></h5>

                            <h5><span>Address:</span><input name="address" id="" value={address} disabled={!edit} onChange={(e) => setAddress(e.target.value)}></input></h5>
                            {
                                edit && <button className='updateBtn' type='Submit'>Update</button>
                            }
                            <br />
                        </form>
                        <button className='editBtn' onClick={() => setEdit(!edit)}>Edit</button>
                    </div>
                    <button className='logout-btn' onClick={() => handleLogout()}>Logout <FontAwesomeIcon icon={faRightFromBracket} /></button>
                </div>
                <div>
                    <br />
                    <h3>Order Details:</h3>
                    <div className='orderDetails'>
                        {allOrders.map((each) =>
                            <div className='eachDetails' key={each.date}>
                                <div className='eachOrder'>
                                    <h6>Serial: {serial++}</h6>
                                    <h5>-------------</h5>
                                    <h6>Order Time: {new Date(each.date).toLocaleString()}</h6>
                                    <h6>Status: <span className='status'>{each.status}</span></h6>
                                    {
                                        <h6>Item*Quantity: {
                                            each.orderItems.map((item) => `${item.itemName} * ${item.quantity}, `)
                                        }</h6>
                                    }
                                    <h6>Order type: <span className='orderType'>{each.type}</span></h6>
                                    <h6>Total amount: ${each.total}</h6>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;