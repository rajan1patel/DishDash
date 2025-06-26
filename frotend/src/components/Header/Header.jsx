import React from 'react'
import './Header.css'
import { assets } from '../../assets/frontend_assets/assets'
const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        {/* <img src={assets.header_img} alt="" /> */}
        <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ea sit optio excepturi qui magnam earum, nemo amet fugit? Eligendi?</p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header
