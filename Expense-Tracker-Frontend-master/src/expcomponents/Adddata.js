import axios from 'axios';
import React, { useContext,  useState } from 'react';
import { Mycontext } from '../context/Mycontext';
import toast from 'react-hot-toast';

const Adddata = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    localDate: '',
  });
const{amount,category,localDate} = formData;
const {token} = useContext(Mycontext);


const handleChange =(e)=>
{
    setFormData({...formData,[e.target.name]:e.target.value});
}
const shandler = (e)=>
{
    e.preventDefault();
    console.log(formData);
    const sendExpense = async()=>
    {
       // console.log("locaDate and type",localDate,typeof(localDate));
        const d1 = new Date(localDate);
        const d2 = new Date();
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
        else if(d1>d2)
        {
          toast.error('you can enter expenses till today');
            return ;
        }
        else
        {
        const Expense=formData;
        try {
            const response = await axios.post(`http://localhost:8079/et/add`,Expense,
                {
                    headers:{
                        "Authorization" :`Bearer ${token}`,
                    },
                }
            );
            if(response.status === 200)
            {
                console.log(response.data);
                setFormData({
                  amount:'',
                  category:'',
                  localDate:''
                });
            }

        } catch (error)
         {
            console.log(error.response.data);
        }
    }
}



    sendExpense();

}
  

 

  return (
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
              <option value="FOOD_GROCERIES">FOOD AND GROCERIES</option>
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

        <div className="mt-6 text-center">
          <button
            onClick={shandler}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adddata;
