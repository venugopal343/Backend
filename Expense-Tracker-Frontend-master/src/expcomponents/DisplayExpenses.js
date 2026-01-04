import React, { useContext, useEffect, useState } from 'react';
import { Mycontext } from '../context/Mycontext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DisplayExpenses = () => {
  const { token } = useContext(Mycontext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const pageSize = 4; // Using 4 as per your code. Remember your backend default is 5.
  const [totalPages, setTotalPages] = useState(0); // Renamed from totalpages for consistency
  const [found, setFound] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const navi=useNavigate();
  const [total,setTotal] = useState(0);

  useEffect(() => {
    const getAllExpenses = async () => { // No need to pass currentPage here, it's from state
      setLoading(true); // Set loading to true before API call
      setError(null); // Clear previous errors
      try {
        const response = await axios.get(`http://localhost:8079/et/getall`, {
          // Pass params and headers in a single config object
          params: {
            size: pageSize,
            page: currentPage,
          },
          headers: {
            // FIX: Corrected "Beare" to "Bearer"
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setData(response.data.content); // Access 'content' from the Page object
          setTotalPages(response.data.totalPages); // Access 'totalPages' from the Page object
          setFound(true);
          try 
          {
            const response = await axios.get(`http://localhost:8079/et/gettotal`,{
              headers:{
                "Authorization" : `Bearer ${token}`
              }
            });
            if(response.status === 200)
            {
              setTotal(response.data)
            }
            if(response.status === 404)
            {
              toast.error('Try again');
              return;
            }
          } catch (error) 
          {
             toast.error('Try again');
              return;
          }


        } else if (response.status === 204) { // HttpStatus.NO_CONTENT
          setData([]);
          setTotalPages(0);
          setFound(false);
          toast('No expenses found.', { icon: 'ℹ️' });
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
        if (error.response && error.response.status === 403) {
          setError('Access denied. Please ensure you are logged in and authorized.');
          toast.error('Authorization failed. Please log in again.');
        } else {
          setError('An error occurred while fetching data. Please try again.');
          toast.error('Error occurred! Please try again.');
        }
        setData([]);
        setTotalPages(0);
        setFound(false);
      } finally {
        setLoading(false); // Set loading to false after API call (success or error)
      }
    };

    // Only fetch if token exists to avoid unnecessary 403s when not logged in
    if (token) {
      getAllExpenses();
    } else {
      setLoading(false);
      setError("Please log in to view expenses.");
      setFound(false);
      setData([]);
      setTotalPages(0);
    }
  }, [token, currentPage, pageSize]); // Add pageSize to dependencies if it could change

  // Pagination Handlers
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const pageButtons = [];
    for (let i = 0; i < totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            currentPage === i
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div className="flex flex-wrap justify-center mt-8 space-x-2 gap-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {pageButtons}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1 || totalPages === 0}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  const deleteExpenseHandler = async(id)=>
  {
    console.log('id is ',id);
      try {
        const response = await axios.delete(`http://localhost:8079/et/delete/${id}`,{
          headers:
          {
            "Authorization" :`Bearer ${token}`
          },
        });
        if(response.status === 200)
        {
          console.log('Deleted Successfully');
          setData((data) => data.filter((exp) => exp.id !==id));
        }
        if(response.status === 404)
        {
          toast.error('Enter Correct Id');
        }
        
      } catch (error) 
      {
        toast.error('Try again later !!');
        }
  }
  const updateHandler = (expense)=>
  {
      navi('/updateexp',{state:{id:expense.id}});
  }


  return (
    <div>
      <div className="bg-gray-50 min-h-screen flex flex-col items-center py-10 px-4">
        <h2 className="text-4xl font-bold mb-10 text-center text-indigo-800">Your Expenses</h2>

        {loading && <p className="text-gray-600 text-lg">Loading expenses...</p>}
        {error && <p className="text-red-600 text-lg">{error}</p>}

        {!loading && !error && found && data.length > 0 ? (
          <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹ {parseFloat(expense.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.localDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    <Button variant="success" className='mr-2' onClick={()=>updateHandler(expense)}>Update</Button>
                    <Button variant="danger" onClick={()=>deleteExpenseHandler(expense.id)}>Delete</Button>
                  </td>

                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 0 && renderPaginationButtons()} {/* Only render buttons if there are pages */}
          </div>
        ) : (
          !loading && !error && <p className="text-gray-600 text-lg">No expenses found.</p>
        )}
        <div className='flex flex-row justify-evenly '>
        <Button variant='primary' className='mt-10 mr-10 rounded-md' onClick={()=>navi('/adddata')}>Add a New Expense</Button>
        <span className='rounded-lg text-2xl text-black mt-10 font-bold p-2  '> Total :  {total} </span>
        </div>
      </div>
    </div>
  );
};

export default DisplayExpenses;