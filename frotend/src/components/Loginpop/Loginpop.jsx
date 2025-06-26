import React, {  useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets';
import './Loginpop.css'
import axios from 'axios';
import { Storecontext } from '../../context/Storecontext';
const Loginpop = ({setshowLogin}) => {
    const [currentstate,setcurrentstate]=useState("signUp");

    const url="http://localhost:4000";
    const {setToken}=useContext(Storecontext)


    //this is all for backend login and register sending data from frontend to backend
    const [data,setdata]=useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;

      setdata(data=>({...data,[name]:value}))
    }


    const onLogin=async(event)=>{
        event.preventDefault();
        let newUrl=url;

        if(currentstate==="Login"){
          newUrl+="/api/user/login"
        }
        else{
          newUrl+="/api/user/register";
        }

        const response=await axios.post(newUrl,data);


        // console.log(response.data);
        // console.log(response)
        
        //getting token from backend and storing it in local storage
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token);
          setshowLogin(false);
        }
        else{
          alert(response.data.message);
        }
    }

    // useEffect(()=>{
    //   console.log(data);
    // },[data])


  return (
    <div>
      <div className='login-popup'>
        <form  onSubmit={onLogin}className='login-pop-container'>
            <div className='login-popup-title'>
                <h2>{currentstate}</h2>
                <img  onClick={()=>setshowLogin(false)}src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {currentstate==="Login"?<></>:  <input name='name'onChange={onChangeHandler} value={data.name} type="text" placeholder='enter your name' required />}
              
                <input type="email"
                name='email'onChange={onChangeHandler} value={data.email}  placeholder='Your Email' />
                <input type="password"
                name='password'onChange={onChangeHandler} value={data.password}  placeholder='Password' />
            </div>
            <button type='submit'>{currentstate==="signUp"?"CreateAccount":"Login"}</button>


            <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>by continuing u agree all the terms and condition and agree the policy</p>
        </div>
        {currentstate==="Login"? 

        <p>Create a new account ? <span onClick={()=>setcurrentstate("signup")}>Click here!</span></p>
        :
        <p>Already ahve an account? <span onClick={()=>setcurrentstate("Login")}>Login here</span></p>}
        </form>
      
        
        
      </div>
    </div>
  )
}

export default Loginpop
