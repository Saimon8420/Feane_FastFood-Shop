import React from 'react';
import './ShippingInfo.css';
const ShippingInfo = () => {

    const shippingInfo = (event) => {
        event.preventDefault();
        const name = event.target.name_info.value;
        const phone = event.target.phone_info.value;
        const address = event.target.address_info.value;

        console.log(name, phone, address);

        event.target.reset();
    }
    return (
        <div className='shippingInfo-container'>
            <h6>Shipping Info</h6>
            <div className='shipping-form'>
                <form onSubmit={shippingInfo}>
                    <span>Name*<input type="text" name='name_info' required placeholder='Enter your full name' />
                    </span>

                    <span>Phone*<input type="tel" name="phone_info" id="" placeholder='Enter phone number' required />
                    </span>

                    <span>Address* <textarea name="address_info" id="" cols="20" rows="5" required placeholder='Enter Address'></textarea>
                    </span>

                    <button type="submit">Proceed CheckOut</button>
                </form>
            </div>
        </div>
    );
};

export default ShippingInfo;