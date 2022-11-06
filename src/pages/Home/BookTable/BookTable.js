import React from 'react';
import { useState } from 'react';
import './BookTable.css';
const BookTable = () => {
    // const [name, setName] = useState([]);
    // const [number, setNumber] = useState([]);
    // const [email, setEmail] = useState([]);
    // const [persons, setPersons] = useState(0);
    // const [date, setDate] = useState([]);
    // const [time, setTime] = useState([]);

    const handleForm = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const number = event.target.phone.value;
        const email = event.target.email.value;
        const person = event.target.person.value;
        const date = event.target.date.value;
        const time = event.target.time.value;

        console.log(name, number, email, person, date, time);

        event.target.reset();
    }

    const submitMsg = () => {
        console.log('thanks for booking');
    }
    return (
        <div className='booking'>
            <h4>Book A Table</h4>
            <div className='booked-container' id='book-table'>
                <div className='form-container'>
                    <form onSubmit={handleForm}>
                        <input type="text" placeholder='Your Name' name='name' required />

                        <input type="tel" name="phone" id="" placeholder='Phone Number' required />

                        <input type="email" name="email" id="" placeholder='Your Email' required />

                        <input type="number" name="person" id="" placeholder='How many persons?' required />

                        <input type="date" name="date" id="" />

                        <input type="time" name="time" id="" re />

                        <button type='submit' id='confirm-btn' onClick={submitMsg}><span>Confirm Booking</span>
                        </button>
                    </form>
                </div>
                <div className="mapouter">
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