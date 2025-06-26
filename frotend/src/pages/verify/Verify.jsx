import React from 'react'
import './verify.css'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { Storecontext } from '../../context/Storecontext'
import { useEffect } from 'react'
export const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    console.log(success,orderId)

    const {url}=useContext(Storecontext);
    const navigate=useNavigate();

    const verifyPayment=async()=>{
        const response=await axios.post(url+"/api/order/verify",{success,orderId})
        if(response.data.success){
            navigate("myorders");

        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    })
  return (
    <div className='verify'>
        <div className='spinner'></div>


        

    </div>
  )
}
