import axios from 'axios';
import React, {  useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({setToken,setRole,setEmail}) => {
    const navi = useNavigate();

    const[LoginReq,setLoginReq]= useState({
      email:'',
      password:''
    })
    const{email,password} = LoginReq;

    const handler =(e)=>
    {
      setLoginReq({...LoginReq,[e.target.name]:e.target.value});
    }

    const loginhanlder = async(e)=>
    {
      console.log('email and password are',email,password);
      e.preventDefault();
        try 
        {
          const LoginRequest = LoginReq;
          const response = await axios.post(`http://localhost:8079/exp/login`,LoginRequest);
          if(response.status === 200)
          {
            console.log("Data is ",response.data);
            const token = response.data.token;
            setEmail(response.data.email);
            setToken(token);
            setRole(response.data.role);
            // localStorage.setItem('token',token);
            // localStorage.setItem('role',response.data.role);
            // localStorage.setItem('email',response.data.email);
            navi('/displayexp');
          }
          
        } catch (error) 
        {
           console.log(error.response.status)
        }
    }




  return (
    <div className='bg-blue-900 h-screen w-full flex flex-col items-center justify-start p-8'>
      
      {/* Login Form Container */}
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md mt-20 p-8'>

        {/* Heading */}
        <div className='text-4xl text-blue-900 font-bold text-center mb-6'>
          LOGIN
        </div>

        <Form onSubmit={loginhanlder}>

          {/* Email Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Email:</label>
            <input
              type="email"
              placeholder='Enter your email'
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
              name="email"
              value={email}
              onChange={handler}
            />
          </div>

          {/* Password Field */}
          <div className='mb-6'>
            <label className='block text-gray-700 font-semibold mb-2'>Password:</label>
            <input
              type="password"
              placeholder='Enter your password'
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
              name="password"
              value={password}
              onChange={handler}
            />
          </div>

          {/* Message for new users */}
<div className='text-sm text-gray-600 text-center mb-4'>
  New user? Please <span className='text-blue-700 font-semibold'>sign up</span> below.
</div>

{/* Buttons */}
<div className='flex justify-between gap-4'>
  <button
    type="submit"
    className='bg-green-700 text-white px-6 py-2 rounded-full w-1/2 hover:bg-green-800 transition'
  >
    Login
  </button>

  <button
    type="button"
    className='bg-blue-600 text-white px-6 py-2 rounded-full w-1/2 ' onClick={()=>navi('/signup')}
  >
    Sign Up
  </button>
</div>


          
        </Form>

      </div>
    </div>
  );
};

export default Login;
