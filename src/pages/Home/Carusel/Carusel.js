import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Carusel.css';
const Carusel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <div className='carousel'>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Item>
                <Carousel.Item>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Item>
                <Carousel.Item>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Carusel;