import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = ({ product, handledAddToCart }) => {
    const { id, category, name, seller, price, stock, ratings, ratingCount, img, shipping, quantity } = product;


    return (
        <div className="card-normal w-80 bg-base-100 shadow-xl m-2 relative mb-5 mt-5 product rounded-lg">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body h-72 pb-10">
                <h3 className="card-title">{name}</h3>
                <p>
                    <span className='text-lg font-semibold'>Price: <span className='text-amber-600'>{price}</span></span><br />
                    <span className='font-medium'>Manucaturar:</span> {seller}<br />
                    <span className='font-medium'>Rating:</span> {ratings} Stars
                </p>
            </div>
            <div className='absolute bottom-0 w-full mt-10'>
                <button className="btn btn-primary w-full addTo-cart-btn" onClick={() => handledAddToCart(product)}>
                    Add to Cart<FontAwesomeIcon icon={faShoppingCart} pull='right'></FontAwesomeIcon>
                </button>
            </div>

        </div>
    );
};

export default Product;