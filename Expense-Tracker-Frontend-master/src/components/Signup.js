import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Mycontext } from '../context/Mycontext'
const Signup = () => {
  const navi = useNavigate();
  const [userdetails,setUserdetails] = useState({
    name:'',
    email:'',
    password:'',
    confirmpassword:'',
    phone:''
  });
  const{setEmail} = useContext(Mycontext);
 
  const{name,email,password,confirmpassword,phone}=userdetails;

  const handler =(e)=>
  {
    setUserdetails({...userdetails,[e.target.name]:e.target.value});
  }

  const shandler =(e)=>
  {
    e.preventDefault();
    console.log("Data is Submitting");
    if(password === confirmpassword)
    {
      if(password.length < 8)
      {
        toast.error('Password length shoulde be atleast 8 characters')
      }
      else if(password.indexOf('@')<0 && password.indexOf('$')<0)
      {
        toast.error('Please include special charcter')
      }
      else if(!(phone.length ===10))
      {
        toast.error('Phone Number must be 10 digits')
      }
      else
      {
          const user={name:name,
                  email:email,
                  password:password,
                  phone:phone
                   };
     // console.log("user details ",user);
     registerUser(user);
      }
  }
  else
  {
    toast.error('Password Mismatch');
  }
  }


  // register user fun
   const registerUser = async(user)=>
     {
      try {
        const response = await axios.post(`http://localhost:8079/exp/reg`,user);
         if(response.status === 201)
         {
            console.log('data is ',response.data);
            setEmail(email);
            toast.success('submitted sucessfully');
            navi('/otpval');
         }
         else
         {
          console.log("Nothing");
         }
      
         } 
         catch (error) 
         {
          if(error.response.status === 400)
          {
              toast.error('User email already exists');
          }
          else
          {
            toast.error('Something went wrong');
          }
            
        }

     }




  return (

    <div className='border-2-yellow bg-sky-900 w-full h-screen flex flex-col items-center justify-start p-8'>

  {/* Heading */}
  <div className='text-white text-5xl text-center mb-12'>
    <h1>Expense Tracker Application</h1>
  </div>

  {/* Form Container */}
  <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md h-auto'>
    <Form onSubmit={shandler}  autoComplete='on' >
      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Name:</label>
        <input type="text" placeholder='Enter your name' className='w-full px-4 py-2 border rounded-md' value={name} onChange={handler} name="name" />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Email:</label>
        <input type="email" placeholder='Enter your email' className='w-full px-4 py-2 border rounded-md' value={email} onChange={handler}  name="email"/>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Password:</label>
        <input type="password" placeholder='Enter your password' className='w-full px-4 py-2 border rounded-md' value={password} onChange={handler}  name="password"/>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Confirm Password:</label>
        <input type="password" placeholder='Confirm Password' className='w-full px-4 py-2 border rounded-md' value={confirmpassword} onChange={handler} name="confirmpassword"/>
      </div>

      <div className='mb-6'>
        <label className='block text-gray-700 font-semibold mb-2'>Phone No:</label>
        <input type="text" placeholder='Enter your number' className='w-full px-4 py-2 border rounded-md'  value={phone} onChange={handler} name="phone"/>
      </div>

      {/* Submit Button */}

            {/* Message for new users */}
<div className='text-sm text-gray-600 text-center mb-4'>
 Already a user? Please <span className='text-blue-700 font-semibold'>Login</span> below.
</div>

{/* Buttons */}
<div className='flex justify-between gap-4'>
  <button
    type="submit"
    className='bg-green-700 text-white px-6 py-2 rounded-full w-1/2 hover:bg-green-800 transition'
  >
    Submit
  </button>

  <button
    type="button"
    className='bg-blue-600 text-white px-6 py-2 rounded-full w-1/2 ' onClick={()=>navi('/login')}
  >
    Login
  </button>
</div>
     
     
    </Form>
  </div>
</div>

  
            
        
  )
}

export default Signup
