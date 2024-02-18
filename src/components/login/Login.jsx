import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'

const Login = () => {
    // state
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const clickLogin = async(e) => {
      e.preventDefault()
      try{
        const url = 'https://workshop-react-api.vercel.app/login'
        const res = await axios.post(url, {username,password})
        const decode = jwtDecode(res.data.token)
        console.log(decode.user_id);
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user_id", decode.user_id)
        setTimeout(() => {
          window.location.reload()
        }, 400)
      } catch(err){
        console.log(err)
      }
    };
    
  return (
    <div className=' bg-[#3E3F56] h-screen flex justify-center items-center'>
       <div className=' bg-gray-900 border-gray-700 px-48 py-10 rounded-lg shadow-lg'>
          <h2 className='text-center text-md text-white'>Welcome</h2>
          <hr className='mt-2'/>
          <form action="">
            <div className='flex flex-col'>
              <input 
                type="text" 
                className=' border border-gray-700 rounded-md mt-6 p-2 ' 
                placeholder='Username'
                onChange={ (e) => setUsername(e.target.value) }/>
              <input 
                type="password" 
                className='border border-gray-700 rounded-md mt-6 p-2 ' 
                placeholder='Password' 
                onChange={ (e) => setPassword(e.target.value) }/>
              <button 
                className=' bg-blue-600 rounded-md mt-5 text-white mx-12 px-2 py-2'
                onClick={clickLogin}>
                  SIGN IN 
              </button>
            </div>
          </form>
       </div>
    </div>
  )
}

export default Login

