import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

const ReviewItem = ({ product, handleRemoveFromCart }) => {
    return (
        <div className="card card-side bg-slate-100 shadow-xl p-0 ps-3">
            <figure className='h-24 my-auto'><img className='w-16 shadow-md' src={product.img} alt="Movie" /></figure>
            <div className="card-body flex flex-row justify-between items-center">
                <div>
                    <h2 className="card-title">{product.name}</h2>
                    <p><b>Price: </b>{product.price} <br /><b>Quantity: </b>{product.quantity}</p>
                </div>
                <div className="card-actions justify-end pl-10">
                    <button onClick={() => handleRemoveFromCart(product.id)} className="btn btn-error hover:bg-red-500 w-14">
                        <TrashIcon className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;