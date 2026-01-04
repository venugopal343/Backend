import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Logout = ({setToken,setRole,setEmail}) => {
  const navi = useNavigate();


  const logoutHandler =()=>
  {
        localStorage.clear();
        setToken(null);
        setRole(null);
        setEmail(null);
        navi("/login");
  }


  return (
    <div>
      
     <div className='flex flex-col items-center justify-start min-h-screen pt-10 pb-10 bg-gray-100'> {/* Added bg-gray-100 for a subtle background */}
            {/* The Logout Card */}
            <div className='bg-white border border-gray-200 rounded-lg shadow-xl p-8 max-w-lg w-full flex flex-col items-center gap-6 mt-10'>
                <span className='text-2xl font-semibold text-gray-800 text-center leading-relaxed'>
                    Are You Sure You Want to Logout?
                </span>
                <Button
                    variant='primary'
                    onClick={logoutHandler}
                    className='w-full max-w-[200px] py-3 text-lg font-medium rounded-full '
                >
                    Logout
                </Button>
            </div>
        </div>
    
    </div>
  )
}

export default Logout
