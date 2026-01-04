import React, { useState } from 'react'

import toast from 'react-hot-toast';
import { useEffect
 } from 'react';
import axios from 'axios';
const Profile = () => {
   
    const[user,setUserDetails] = useState({});

    useEffect(()=>
    {
        const getprofile = async()=>
        {
            
                try {
                    const email = localStorage.getItem("email");
                    const token = localStorage.getItem("token");
                    console.log("Email is",email);
                    const response = await axios.get(`http://localhost:8079/user/profile/${email}`,
                        {
                            headers:{
                                Authorization : `Bearer ${token}`
                            }
                        });
                        if(response.status === 200)
                        {
                            setUserDetails(response.data);
                        }
                        else
                        {
                            console.log('Nothing came');
                        }
                        console.log('Data set to user');
                } catch (error)
                 {
                    toast.error('Error occured');
                }
            }
            getprofile();

    },[])



  return (
    <div>
      <div className='bg-sky-900  border-2-yellow w-full h-screen flex flex-col items-center justify-start p-8 '>


       <div className='bg-white rounded-lg shadow-lg  p-8 w-full max-w-md  h-auto m'>
         <div className='text-black text-sm font-bold px-auto py-auto mb-3'>
            <span>MANAGE YOUR PROFILE INFORMATION</span>
        </div>
         <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Name:</label>
         <label className='block text-gray-700 rounde-lg shadow-md   font-semibold mb-2'>{user.name}</label>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Email:</label>
         <label className='block text-gray-700 rounde-lg shadow-md   font-semibold mb-2'>{user.email}</label>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Phone:</label>
         <label className='block text-gray-700 rounde-lg shadow-md   font-semibold mb-2'>{user.phone}</label>
       
      </div>

       </div>

      </div>

    </div>
  )
}

export default Profile
