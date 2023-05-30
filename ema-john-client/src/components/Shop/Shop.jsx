import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import {Link} from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get product id from local storage
        for (const id in storedCart) {
            // step 2: get the product by using product id
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                // get quantity of the product
                const quantity = storedCart[id];
                // step 3: add quantity
                addedProduct.quantity = quantity;
                // step 4: add the product to saved cart
                savedCart.push(addedProduct);
            }
            // step 5: set the cart
            setCart(savedCart);
        }

    }, [products])

    const handledAddToCart = (product) => {
        // setCart([...cart, product]);
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id);
    }

    function handleClearCart() {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container grid grid-cols-5 relative'>
            <div className="products-container col-span-4 container grid grid-cols-3 justify-items-center pt-12">
                {
                    products.map(product => <Product key={product.id} product={product} handledAddToCart={handledAddToCart}></Product>)
                }
            </div>
            <div className="cart-container fixed top-15 right-0 h-screen cart-info">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <div>
                        <Link to='/orders'>
                            <button className='flex w-full justify-between p-3 mt-3 bg-amber-500 text-white rounded-md'>
                                Review Order
                                <ArrowRightIcon className="h-6 w-6 text-white" />
                            </button>
                        </Link>
                    </div>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;