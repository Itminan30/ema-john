import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData, Link } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { CreditCardIcon } from '@heroicons/react/24/solid';


const Orders = () => {
    const savedCart = useLoaderData();
    console.log(savedCart);
    const [cart, setCart] = useState(savedCart);

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product.id != id);
        setCart(remaining);
        removeFromDb(id);
    }

    function handleClearCart() {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='orders-container grid grid-cols-5 relative'>
            <div className='order-container col-span-4 container grid grid-cols-1 justify-items-center pt-12'>
                <h1 className='m-5'>Ordered Items: {cart.length}</h1>
                <div className='grid grid-cols-1 gap-4 mt-5'>
                    {
                        cart.map(product => <ReviewItem
                            key={product.id}
                            product={product}
                            handleRemoveFromCart={handleRemoveFromCart}>
                        </ReviewItem>)
                    }
                </div>
            </div>
            <div className="cart-container pt-10 h-screen fixed top-10 right-0">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link to='/checkout'>
                        <button className='flex w-full justify-between p-3 mt-3 bg-amber-500 text-white rounded-md'>
                            Proceed Checkout
                            <CreditCardIcon className="h-6 w-6 text-white" />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;