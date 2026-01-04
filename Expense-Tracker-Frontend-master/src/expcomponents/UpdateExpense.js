import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import { Mycontext } from '../context/Mycontext';


const UpdateExpense = () => {
    const{token} = useContext(Mycontext);
    const  navi = useNavigate();
    const loc = useLocation();
    const [expense,setExpense] = useState({
        amount:'',
        category:'',
        localDate:''});
    const {id} = loc.state;
    const {amount,category,localDate} = expense;
    useEffect(()=>
    {  const fetchExpense = async(id,token)=>
        {  try {
           
                const response = await axios.get(`http://localhost:8079/et/get/${id}`,
                    {
                        headers:{
                            "Authorization" :`Bearer ${token}`,
                        } });
                if(response.status === 200)
                {
                     setExpense(response.data);
                }
                if(response.status === 404)
                {
                    toast.error('Id not Found');
                }
            } catch (error) {
                toast.error("Try again later");
            }
        }
        fetchExpense(id,token);
    },[id,token,setExpense])

    const handleChange = e =>
    {
        setExpense({...expense,[e.target.name]:e.target.value});
    }
    const backhandler = ()=>
    {
        navi('/displayexp');
    }
    const  updatehandler = async()=>
    {
        try {    
            if(isNaN(parseFloat(amount)))
        {
            toast.error('Must be a number');
            return;
        }

        else if(parseFloat(amount) <= 0)
        {   
            toast.error('Amount should be greater than zero');
            return;
        }
        else
        {
            const Expense = expense;
            const response = await axios.put(`http://localhost:8079/et/update/${id}`,Expense,
                {
                    headers:
                    {
                        "Authorization" :`Bearer ${token}`,
                    }
                });
                if(response.status === 200){
                    setExpense(response.data);
                    toast.success('updated successfully');
                    navi('/displayexp')
                }
            }
            
        } catch (error)
        {
            toast.error('Error occured');
        }

    }

  return (
    <div>
         <div className="bg-orange-100 min-h-screen flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center text-sky-800">Expense Tracker</h1>
 
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Expense Name</label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select
              name="category"
             value={category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
            <option value="">Select Category</option>
              <option value="FOOD_GROCERIES" selected>FOOD AND GROCERIES</option>
              <option value="SHOPPING">SHOPPING</option>
              <option value="TRANSPORT">TRANSPORT</option>
              <option value="HEALTH_MEDICAL">HEALTH AND MEDICAL</option>
              <option value="EDUCATION">EDUCATION</option>
              <option value="ENTERTAINMENT">ENTERTAINMENT</option>
              <option value="INSURANCE">INSURANCE</option>
              <option value="HOUSEHOLD_ITEMS">HOUSEHOLD ITEMS</option>
              <option value="MOBILE_WIFI">MOBILE AND WIFI </option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
            <input
              type="date"
              placeholder='yyyy-mm-dd'
              name="localDate"
              value={localDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
    <div className='flex flex-row justify-center'>
        <div className=" mt-6 text-center">
          <button
             onClick={updatehandler}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition mr-4"  >
            Update
          </button>
          <button
            onClick={backhandler}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition" >
            Cancel
          </button>
        </div>
     </div>
      </div>
    </div>
    </div>
  )
}

export default UpdateExpense
