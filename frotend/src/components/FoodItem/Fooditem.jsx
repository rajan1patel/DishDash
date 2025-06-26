import React, { useContext } from 'react';
import './Fooditem.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Storecontext } from '../../context/Storecontext';

const Fooditem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(Storecontext);

  const url='http://localhost:4000';

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
      {/* src={url+"/images/"+image}..use this when yur backend as listed food list  */}
        <img className='food-item-img'
       src={url+"/images/"+image} alt="" />

       {/* //elements which updates cart  */}
        {!cartItems[id] ? (
          <img 
            className='add' 
            onClick={() => addToCart(id)} 
            src={assets.add_icon_white} 
            alt="Add to Cart"
          />
        ) : (
          <div className='food-item-counter'>
            <img 
              onClick={() => removeFromCart(id)} 
              src={assets.remove_icon_red} 
              alt="Remove from Cart" 
            />
            <p>{cartItems[id]||0}</p> 
            <img 
              onClick={() => addToCart(id)} 
              src={assets.add_icon_green} 
              alt="Increase Quantity" 
            />
          </div>
        )}
      </div>

      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default Fooditem;
