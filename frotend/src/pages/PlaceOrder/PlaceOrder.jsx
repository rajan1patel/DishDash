import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { Storecontext } from "../../context/Storecontext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems } = useContext(Storecontext);

  // State for storing user delivery information
  const [data, setData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Handle input changes and update corresponding state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission to place the order
  const placeOrder = async (e) => {
    e.preventDefault();

    // Prepare list of items in the order
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    // Prepare complete order payload
    const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2;
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee,
    };
    console.log(orderData)

    try {
      // Send POST request to backend to place order
      const response = await axios.post(
        `http://localhost:4000/api/order/place`,
        orderData,
        { headers: { token } }
      );

      // Redirect to payment if order successful
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={data.firstName}
            onChange={handleChange}
            required

          />
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            value={data.lastname}
            onChange={handleChange}required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={data.email}
          onChange={handleChange}required
        />

        <input
          type="text"
          name="street"
          placeholder="Street"
          value={data.street}
          onChange={handleChange}required
        />

        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={handleChange}required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={data.state}
            onChange={handleChange}
          />
        </div>

        <div className="multi-fields">
          <input
            type="text"
            name="zipcode"
            placeholder="Zip code"
            value={data.zipcode}
            onChange={handleChange}required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={data.country}
            onChange={handleChange}required
          />
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={handleChange}required
        />
      </div>

      <div className="placeorder-right">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>{getTotalCartAmount() === 0 ? "$0" : "$2"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
