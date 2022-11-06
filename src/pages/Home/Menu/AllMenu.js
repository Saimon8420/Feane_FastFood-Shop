import React, { useContext, useEffect, useState } from 'react';
import Foods from './Foods/Foods';
import './AllMenu.css';
import { CartContext } from '../../../App';
const AllMenu = () => {
    const [foods, setFoods] = useState([]);
    const [filterFoods, setFilterFoods] = useState([]);
    const [cartItem, setCartItem] = useContext(CartContext);

    useEffect(() => {
        fetch('foodData.json')
            .then(res => res.json())
            .then(data => setFoods(data))
    }, [])

    const filterFood = (name) => {
        document.getElementById('default').style.display = 'none';
        let allElements = document.getElementsByClassName('btn');

        // styling section(when clicked on menu filter section)
        Array.from(allElements).forEach(function (element) {
            if (element.innerHTML === name) {
                element.style.cssText = `
                background-color: rgb(34, 40, 49);
                color: white;
                border-radius: 5px;
                `;

                document.getElementById('default-btn').style.cssText = `
                background-color:white;
                color:black;
                `;
            }
            else {
                element.style.cssText = `
                background-color:white;
                color: black;
                `;
            }
        });

        // Filter menu section by name
        if (name === 'Burger') {
            const burger = foods.filter(food => food.name.includes('Burger'))
            setFilterFoods(burger);
        }
        else if (name === 'Pizza') {
            const pizza = foods.filter(food => food.name.includes('Pizza'))
            setFilterFoods(pizza);
        }
        else if (name === 'Pasta') {
            const pasta = foods.filter(food => food.name.includes('Pasta'))
            setFilterFoods(pasta);
        }
        else if (name === 'Fries') {
            const fries = foods.filter(food => food.name.includes('Fries'))
            setFilterFoods(fries);
        }
        else {
            setFilterFoods(foods);
            document.getElementById('default-btn').style.cssText = `
            background-color: rgb(34, 40, 49);
            color: white;
            border-radius:5px;
            `;
        }
    }

    // function for Selected food items & also increase the quantity
    const selected = (items) => {
        const matched = (cartItem.find(food => food.id === items.id));
        if (matched) {
            const newCart = cartItem.map(item => item.id === items.id ? { ...matched, quantity: matched.quantity + 1 } : item);
            setCartItem(newCart);
        }
        else {
            const newCart = [...cartItem, { ...items, quantity: 1 }];
            setCartItem(newCart);
        }
    }
    // console.log(cartItem);
    return (
        <div className='menu-container'>
            <h2>Our Menu</h2>
            <div className='filter-section'>
                <button id='default-btn' onClick={() => filterFood('All')}>All</button>

                <button className='btn' onClick={() => filterFood('Burger')}>Burger</button>

                <button className='btn' onClick={() => filterFood('Pizza')}>Pizza</button>

                <button className='btn' onClick={() => filterFood('Pasta')}>Pasta</button>

                <button className='btn' onClick={() => filterFood('Fries')}>Fries</button>

            </div>
            <div className='food-container'>
                <div id='default'>
                    {
                        foods.map(food => <Foods
                            key={food.id}
                            food={food}
                            selected={selected}
                        ></Foods>)
                    }
                </div>
                <div id='after-filter'>
                    {
                        filterFoods.map(food => <Foods
                            key={food.id}
                            food={food}
                            selected={selected}
                        ></Foods>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllMenu;