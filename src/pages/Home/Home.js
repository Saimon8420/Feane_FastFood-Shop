import React from 'react';
import BookTable from './BookTable/BookTable';
import Carusel from './Carusel/Carusel';
import './Home.css';
import AllMenu from './Menu/AllMenu';
const Home = () => {
    return (
        <div className='home-container'>
            <Carusel />
            <div id='menu'>
                <AllMenu />
            </div>
            <div className='about-us'>
                <div className='image'>
                    <img src="images/about-img.png" alt="" />
                </div>
                <div className='description' id='about'>
                    <h2>We Are Feane</h2>
                    <p id='about-info'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem corporis, eligendi porro odit labore mollitia voluptatum, doloremque, culpa ducimus nam quo nobis accusantium necessitatibus sed hic. Optio ex dolor totam!
                        Hic, amet maxime a, blanditiis natus, possimus quidem ducimus culpa sint magni porro rem et placeat itaque praesentium totam facere velit iure voluptates laborum aliquam veniam molestias quam? Ipsa, excepturi!</p>
                </div>
            </div>
            <div className='booking-container'>
                <BookTable />
            </div>
        </div>
    );
};

export default Home;