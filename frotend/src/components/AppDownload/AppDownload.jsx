import React from 'react'
import './AppDownloaad.css'
import { assets } from '../../assets/frontend_assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  <br /> Food del </p>

      <div className='app-download-platform'>
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
