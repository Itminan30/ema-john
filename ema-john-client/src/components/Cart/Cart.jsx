import React from 'react';
import './Cart.css';
import { TrashIcon } from '@heroicons/react/24/solid';

const Cart = ({ cart, handleClearCart, children }) => {
    let totalPrice = 0;
    let shippingCharge = 0;
    let quantity = 0;
    for (const product of cart) {
        // if(product.quantity === 0){
        //     product.quantity = 1;
        // }
        totalPrice = totalPrice + product.price * product.quantity;
        shippingCharge = shippingCharge + product.shipping * product.quantity;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice*7/100;
    const grandTotal = totalPrice + shippingCharge + tax;
    return (
        <div className='p-5'>
            <h4 className='text-3xl font-semibold text-center'>Order Summary</h4>
            <p className='mt-10'><b>Selected Items:</b> {quantity}</p>
            <p className=''><b>Total Price:</b> ${totalPrice}</p>
            <p className=''><b>Shipping Charge:</b> ${shippingCharge}</p>
            <p className=''><b>Tax:</b> ${tax.toFixed(2)}</p>
            <p className='text-2xl font-semibold'>Grand Total: ${grandTotal.toFixed(2)}</p>
            <button onClick={() => handleClearCart()} className='flex w-full justify-between p-3 mt-3 bg-red-500 text-white rounded-md'>
                Clear Cart
                <TrashIcon className="h-6 w-6 text-white" />
            </button>
            {children}
        </div>
    );
};

export default Cart;