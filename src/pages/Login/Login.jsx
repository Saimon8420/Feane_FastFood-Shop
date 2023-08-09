import React, { useEffect, useState } from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Slide, ToastContainer, toast } from 'react-toastify';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userData = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const handleForm = (event) => {
        event.preventDefault();
        dispatch(loginUser({ email: email, password: password }))
        event.target.reset();
        setValidEmail("");
        setValidPass("");
        setEmail("");
        setPassword("");
        setTrigger(true);
    }
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState("");
    const [validPass, setValidPass] = useState("");
    useEffect(() => {
        if (email.length > 0) {
            setValidEmail(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email));
        }
        if (password.length > 0) {
            setValidPass(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password));
        }
    }, [email, password, setValidEmail, setValidPass])
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        if (trigger && userData?.loginSuccess?.[0]) {
            toast.success(userData?.loginSuccess?.[0], {
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
        if (userData?.loginSuccess?.[0] === "Login successful") {
            setTimeout(() => {
                navigate("/profile");
            }, 2000);
        }
        if (trigger && userData?.loginError?.[0]) {
            toast.error(userData?.loginError?.[0], {
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
    }, [userData, navigate, trigger]);
    return (
        <div className='display-login'>
            <ToastContainer toastStyle={{ backgroundColor: "rgb(34, 40, 49)", color: "white" }} />
            <br />
            <h2>Welcome to Login</h2>
            <br />
            <h4>Enter your credential to continue</h4>
            <br />
            <div className='display-form'>
                <form onSubmit={handleForm}>
                    <div className='formInput'>
                        <input type="email" name="email" id="" placeholder='Your Email' required onChange={(e) => setEmail(e.target.value)} />
                        {
                            validEmail === false && email.length > 0 && <p className='errorMsg'><FontAwesomeIcon icon={faCircleXmark} />Invalid Email</p>
                        }
                        {
                            validEmail === true && email.length > 0 && <p className='successMsg'><FontAwesomeIcon icon={faCircleCheck} />Valid Email</p>
                        }
                        <input type="password" name="password" id="" placeholder='Your password?' required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {
                        validPass === false && password.length > 0 && <p className='errorMsg'><FontAwesomeIcon icon={faCircleXmark} />Invalid Password</p>
                    }
                    {
                        validPass === true && password.length > 0 && <p className='successMsg'><FontAwesomeIcon icon={faCircleCheck} />Valid Password</p>
                    }
                    <br />
                    < button
                        disabled={(email === "" && password === "")}
                        type='submit'><span>Login</span>
                    </button>
                    <p>Haven't any account? <span onClick={() => navigate("/register")}>Please Register</span> </p>
                </form>
            </div>
        </div >
    );
};

export default Login;