import React, { useContext } from 'react'
import "./Fooddisplay.css"
import { Storecontext } from '../../context/Storecontext'
import Fooditem from '../FoodItem/Fooditem';
const Fooddisplay = ({category}) => {
    const{food_list}=useContext(Storecontext);
  return (
    <div className='food-display'>
<h2>Top dishes near You</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
          //shows all items if category is "All"
          //otherwise shows items that match the selected category
          if(category==="All" || category===item.category){
            return(
              <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}></Fooditem>
          )
          }
           
        })}
      </div>
    </div>
  )
}

export default Fooddisplay
