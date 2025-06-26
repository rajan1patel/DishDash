import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext';
const Navbar = ({setshowLogin}) => {
  
    const [menu,setmenu]=useState("home");
    const{getTotalCartAmount,token,setToken}=useContext(Storecontext)


    const navigate=useNavigate();
    const logOut=()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate('/');
    }
  return (
    <div className='navbar'>
      {/* //for smooth scrolling effect we use link tag from react --router-dom
      //and for normal navigation we use anchor tag */}
     <Link to='/'> <img src={assets.logo} alt="Chef house" className='logo' /></Link> 

      <ul className="navbar-menu">
        <Link  to='/' onClick={()=>setmenu("Home")}       className={menu==="Home"?"active":""}>Home</Link>
        <a href='#explore-menu'onClick={()=>setmenu("Menu")}       className={menu==="Menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setmenu("Mobile-app")} className={menu==="Mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer' onClick={()=>setmenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact-us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
       <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link> 
        <div className='navbar-search-icon'>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token? <button onClick={()=>setshowLogin(true)}>Sign In</button>:
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li><img src={assets.bag_icon} alt="" />Orders</li>
            <hr />
            <li onClick={logOut}><img src={assets.logout_icon} alt="" />Logout</li>
          </ul>

          </div>}
       
      </div>

    </div>
  )
}

export default Navbar
