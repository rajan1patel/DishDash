import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = () => {
    const url="http://localhost:4000";
    
    //object to hold form data
    //initially all fields are empty
    // for passing to backend
    const[image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler=async(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price));
        formData.append("category",data.category)
        formData.append("image",image)

        const response=await axios.post(`${url}/api/food/add`,formData)
        
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
        
    }
   
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):  assets.upload_area} alt="" />
                </label>
                <input  onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden required />

             </div> 
             <div className="add-product-name flex-col" >
                <p>Product-name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder=' type here' />
             </div>
             <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea 
                onChange={onChangeHandler} value={data.description} 
                name="description" placeholder='Describe your product' rows={7}></textarea>
             </div>
<div className="add-category-price">
    <div className="add-category flex-col">
        <p>Product category</p>
        <select  onChange={onChangeHandler}   name="category" id="">
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Desert">Desert</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">  Pasta</option>
            <option value="Noodles">  Noodles</option>
        </select>
    </div>
    <div className="add-price flex-col">
        <p>Product-price</p>
        <input onChange={onChangeHandler} value={data.price} type="number"name="price" placeholder='$20' />
    </div>
</div>
<button type='Submit'>Add</button>
            
        </form>
      
    </div>
  )
}

export default Add
