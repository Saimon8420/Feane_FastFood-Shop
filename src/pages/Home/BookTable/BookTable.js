import React, { useEffect } from 'react';
import { useState } from 'react';
import './BookTable.css';
import { Slide, toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
const BookTable = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [persons, setPersons] = useState(0);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleForm = (event) => {
        event.preventDefault();
        if (name.length > 0 && email.length > 0 && number.length > 0 && persons.length > 0 && date.length > 0 && time.length > 0) {
            toast.success("Booking successful", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, //3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
                theme: "light",
            });
        }
        event.target.reset();
    }
    const [validNum, setValidNum] = useState(true);
    useEffect(() => {
        setValidNum(/^(01|008801|8801|\+8801)[0-9]{9}$/.test(number));
    }, [number, setValidNum])
    return (
        <div className='booking'>
            <ToastContainer toastStyle={{ backgroundColor: "rgb(34, 40, 49)", color: "white" }} />
            <h4>Book A Table</h4>
            <div className='booked-container' id='book-table'>
                <div className='form-container'>
                    <form onSubmit={handleForm}>
                        <div className='form-input'>
                            <input type="text" placeholder='Your Name' name='name' required onChange={(e) => setName(e.target.value)} />

                            <input type="tel" name="phone" id="" placeholder='Phone format : 01521333567 || +8801521333567' required onChange={(e) => setNumber(e.target.value)} />
                            {
                                !validNum && number.length > 0 && <p className='errorMsg'><FontAwesomeIcon icon={faCircleXmark} />Invalid Number</p>
                            }
                            {
                                validNum && number.length > 0 && <p className='successMsg'><FontAwesomeIcon icon={faCircleCheck} />Valid Number</p>
                            }

                            <input type="email" name="email" id="" placeholder='Your Email' required onChange={(e) => setEmail(e.target.value)} />

                            <input type="number" name="person" id="" placeholder='How many persons?'
                                min={2} max={8} required onChange={(e) => setPersons(e.target.value)} />

                            <input type="date" name="date" id="" required onChange={(e) => setDate(e.target.value)} />

                            <input type="time" name="time" id="" required onChange={(e) => setTime(e.target.value)} />
                        </div>
                        <button type='submit' id='confirm-btn' ><span>Confirm Booking</span>
                        </button>
                    </form>
                </div>
                <div className="mapouter">
                    <h4>Find Us:</h4>
                    <div className="gmap_canvas">
                        <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed" >
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookTable;