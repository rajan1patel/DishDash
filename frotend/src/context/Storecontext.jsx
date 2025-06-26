// import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";

// export const Storecontext = createContext(null);

// const StorecontextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState({});

//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1, // Update only the clicked item
//     }));
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       if (!prev[itemId]) return prev; // Ensure item exists

//       const updatedCart = { ...prev };
//       if (updatedCart[itemId] === 1) {
//         delete updatedCart[itemId]; // Remove if count is 1
//       } else {
//         updatedCart[itemId] -= 1; // Decrease count
//       }
//       return updatedCart;
//     });
//   };

// //  const addToCart=(itemId)=>{
// //     if(!cartItems[itemId]){
// //         setCartItems((prev)=>({...prev,[itemId]:1}))
// //     }
// //     else{
// //         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
// //     }
// //  }

// //  const removeFromCart=(itemId)=>{
// //     setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
// //  }

//  useEffect(()=>{
// console.log(cartItems)
//  },[cartItems])

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//   };

//   return (
//     <Storecontext.Provider value={contextValue}>
//       {children}
//     </Storecontext.Provider>
//   );
// };

// export default StorecontextProvider;

import { createContext, useEffect, useState } from "react";

// import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

const url = "http://localhost:4000";
export const Storecontext = createContext(null);

const StorecontextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    
    if(!cartItems[itemId]){
      setCartItems((prev) => ({ ...prev, [itemId]: 1 })); // Add item with quantity 1
    }
    else{
      setCartItems((prev) => {
        return { ...prev, [itemId]: prev[itemId] + 1 }; // Increment quantity if item already exists
      });
    }
      
    // Send the itemId to the backend to update the cart
    // Ensure the token is set before making the request
    if (token) {
     await axios.post(url+"/api/cart/add", {itemId}, { headers: { token } });
    }
  };

 

  const removeFromCart = async (itemId) => {
    if (token) {
      // Ensure you're calling the correct endpoint for removing an item
      await axios.post(
        url+"/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }

    setCartItems((prev) => {
      if (!prev[itemId]) return prev; // If item is not in cart, return unchanged state

      const updatedCart = { ...prev };
      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId]; // Remove item if quantity is 1
      } else {
        updatedCart[itemId] -= 1; // Otherwise, decrement count
      }

      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  // to prevent forom logging out on reload
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const loadCartData = async (token) => {
    const response = await axios.get(
      url + "/api/cart/get",
      // {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {children}
    </Storecontext.Provider>
  );
};

export default StorecontextProvider;
