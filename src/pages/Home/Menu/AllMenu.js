import React, { useContext, useEffect, useState } from 'react';
import Foods from './Foods/Foods';
import './AllMenu.css';
import { CartContext } from '../../../App';
const AllMenu = () => {
    const [foods, setFoods] = useState([]);
    const [filterFoods, setFilterFoods] = useState("all");
    const [cartItem, setCartItem] = useContext(CartContext);

    useEffect(() => {
        fetch('foodData.json')
            .then(res => res.json())
            .then(data => setFoods(data))
    }, []);
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
    return (
        <div className='menu-container'>
            <h2>Our Menu</h2>
            <div className='filter-section'>
                <button className={filterFoods === "all" && 'btn'} onClick={() => setFilterFoods("all")}>All</button>
                <button className={filterFoods === "burger" && 'btn'} onClick={() => setFilterFoods('burger')}>Burger</button>
                <button className={filterFoods === "pizza" && 'btn'} onClick={() => setFilterFoods('pizza')}>Pizza</button>
                <button className={filterFoods === "pasta" && 'btn'} onClick={() => setFilterFoods('pasta')}>Pasta</button>
                <button className={filterFoods === "fries" && 'btn'} onClick={() => setFilterFoods('fries')}>Fries</button>
            </div>
            <div className='food-container'>
                <div id='default'>
                    {filterFoods === "all" ?
                        foods.map(food => <Foods
                            key={food.id}
                            food={food}
                            selected={selected}
                        ></Foods>) :
                        foods.filter(each => each.name.toLowerCase().includes(filterFoods)).map(food => <Foods
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