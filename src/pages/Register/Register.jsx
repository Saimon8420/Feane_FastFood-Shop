import React, { useEffect, useState } from 'react';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Slide, ToastContainer, toast } from 'react-toastify';
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const userData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleForm = (event) => {
        event.preventDefault();
        const userInfo = { name: name, email: email, password: password, phone: phone, address: address }
        dispatch(registerUser(userInfo));
        event.target.reset();
        setValidEmail("");
        setValidNum("");
        setValidPass("");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
        setTrigger(true);
    }
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [validNum, setValidNum] = useState(true);
    useEffect(() => {
        setValidEmail(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email));
        setValidPass(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password));
        setValidNum(/^(01|008801|8801|\+8801)[0-9]{9}$/.test(phone));
    }, [email, password, phone, setValidEmail, setValidPass, setValidNum]);
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        if (trigger && userData?.registerSuccess?.[0]) {
            toast.success(`${userData?.registerSuccess?.[0]}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000, //2 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
                theme: "light",
            });
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
        if (trigger && userData?.registerError?.[0]) {
            toast.error(`${userData?.registerError?.[0]}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, //2 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
                theme: "light",
            });
        }
    }, [userData, trigger, navigate]);
    return (
        <div className='display-register'>
            <ToastContainer toastStyle={{ backgroundColor: "rgb(34, 40, 49)", color: "white" }} />
            <br />
            <h2>Welcome to Registration</h2>
            <br />
            <h4>Enter your credential to continue</h4>
            <br />
            <div className='register-form'>
                <form onSubmit={handleForm}>
                    <div className='form-Input'>
                        <input type="text" name="name" id="" placeholder='Your name' required onChange={(e) => setName(e.target.value)} />

                        <input type="email" name="email" id="" placeholder='Your email' required onChange={(e) => setEmail(e.target.value)} />
                        {
                            (validEmail === false && validEmail !== "" && email.length > 0) && <p className='errorMsg'><FontAwesomeIcon icon={faCircleXmark} />Invalid Email</p>
                        }
                        {
                            (validEmail === true && validEmail !== "" && email.length > 0) && <p className='successMsg'><FontAwesomeIcon icon={faCircleCheck} />Valid Email</p>
                        }
                        {password.length === 0 &&
                            <label htmlFor="">Password: Length>=6, one [A-Z],one [a-z], one [!@#$%^&*/]</label>
                        }
                        <input type="password" name="password" id="" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} aria-multiline={true} />
                        {
                            (validPass === false && validPass !== "" && password.length > 0) && <p className='errorMsg'><FontAwesomeIcon icon={faCircleXmark} />Invalid Password</p>
                        }
                        {
                            (validPass === true && validPass !== "" && password.length > 0) && <p className='successMsg'><FontAwesomeIcon icon={faCircleCheck} />Valid Password</p>
                        }
                        {
                            phone.length === 0 && <label htmlFor="">Phone format: 01521333567 || +8801521333567</label>
                        }
                        <input type="tel" name="phone" id="" placeholder='Enter number' required onChange={(e) => setPhone(e.target.value)} />
                        {
                            (validNum === false && validNum !== "" && phone.length > 0) && <p className='errorMsg'><FontAwesomeIcon icon={faCircleXmark} />Invalid Number</p>
                        }
                        {
                            (validNum === true && validNum !== "" && phone.length > 0) && <p className='successMsg'><FontAwesomeIcon icon={faCircleCheck} />Valid Number</p>
                        }

                        <textarea name="address" id="" maxLength={50} placeholder='Your address' required onChange={(e) => setAddress(e.target.value)}>
                        </textarea>

                    </div>
                    <br />
                    {
                        < button
                            disabled={email === "" && password === "" && phone === "" && address === ""}
                            type='submit'><span>Register</span>
                        </button>
                    }
                    <p>Have an account? <span onClick={() => navigate("/login")}>Please Login </span></p>
                </form>
            </div>
        </div >
    );
};

export default Register;