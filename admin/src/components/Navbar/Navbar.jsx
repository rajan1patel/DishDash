import React from 'react'
import {assets} from '../../assets/assets.js'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img  className="logo"src={assets.logo} alt="" />
        <img src={assets.profile_image} alt="" />
      
    </div>
  )
}

export default Navbar
