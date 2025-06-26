import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Home.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
  const[category,setcategory]=useState("All");
  return (
    <div>
      <Header></Header>
      <ExploreMenu category={category} setcategory={setcategory}></ExploreMenu>
      <Fooddisplay category={category}></Fooddisplay>
      <AppDownload></AppDownload>
    </div>
  )
}

export default Home
