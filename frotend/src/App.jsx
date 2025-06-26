import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/footer/Footer'
import Loginpop from './components/Loginpop/Loginpop'
import { Verify } from './pages/verify/Verify'

const App = () => {
  const [showLogin,setshowLogin]=useState(false);
  return (
    <>
    {showLogin?<Loginpop setshowLogin={setshowLogin}></Loginpop>:<></>}
    <div className='app'>
      {/* //setshow login will be passed to navbar so that it can open login popup
      //when user clicks on sign in button and blur all other components */}
      <Navbar setshowLogin={setshowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify/>}></Route>
      </Routes>
    </div>
    <Footer></Footer>
    </>
  )
}

export default App



// 8:4:55