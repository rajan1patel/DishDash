import React, { useContext } from 'react';
import './Cart.css';
import { Storecontext } from '../../context/Storecontext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount } = useContext(Storecontext);

  const navigate=useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            const quantity = cartItems[item._id];
            const total = item.price * quantity;

            return (
              <div>
              <div key={index} className="cart-items-item cart-items-title">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>${item.price*cartItems[item._id]}</p>
              <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
              </div>
              <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>${getTotalCartAmount()==0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()}</b>
            </div>
          </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have promocode enter here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promocode' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
