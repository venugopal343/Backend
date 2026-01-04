import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Mycontext } from '../context/Mycontext';
import { useNavigate } from 'react-router-dom';
const Otpvalidate = () => {
  const [otp, setOtp] = useState("");
  const{email} = useContext(Mycontext);
  const navi = useNavigate();


  useEffect(()=>
  {
    if(!email)
    {
      toast.error('Error ocuured First fill details');
       navi('/signup');
    }
  },[email,navi])

  const otpsendhandler = async()=>
  {
    try {
    const Otprequest = { email };
    const response = await axios.post(`http://localhost:8079/exp/otp`, Otprequest);
    if (response.status === 200) {
      toast.success('OTP sent to your email');
    }
  } catch (error) {
    toast.error('Failed to send OTP');
  }
  }



  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error('OTP must be 6 digits');
      return;
    }

    try {
        const Otprequest = {email:email};
      const res = await axios.post(`http://localhost:8079/exp/otp/validate?otp=${otp}`,Otprequest);
      if(res.status === 200)
      {
        toast.success('OTP Verified Successfully!');
        console.log(res.data);
        navi('/login');
      // Navigate to dashboard or login
      }
    } catch (err) {
      toast.error('Invalid OTP');
      console.error(err);
    }
  };

  return (
    <div className='bg-blue-900 h-screen flex justify-center items-center'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-sm w-full'>
        <h2 className='text-2xl font-bold mb-4 text-center text-blue-700'>Enter OTP</h2>

        <form  onSubmit={handleSubmit}>
          <input
            type='text'
            maxLength={6}
            placeholder='Enter 6-digit OTP'
            className='w-full px-4 py-2 border rounded-md text-center tracking-widest text-lg mb-4'
            value={otp}
            onChange={handleChange}
          />

          <div className='flex flex-row w-full justify-evenly '>

             <button
            type='button'
            className='bg-blue-700 text-white px-3  py-2 rounded-md hover:bg-blue-800 transition w-max-sm'
            onClick={otpsendhandler}
          >
            Send OTP
          </button>

          <button
            type='submit'
            className='bg-blue-700 text-white py-2 px-3 rounded-md hover:bg-blue-800 transition w-max-sm' 
          >
            Verify OTP
          </button>
          </div>
        </form>

        <div className='text-center text-sm text-gray-500 mt-4'>
          Didn’t receive OTP? <span className='text-blue-600 cursor-pointer'>Resend</span>
        </div>
      </div>
    </div>
  );
};

export default Otpvalidate;
