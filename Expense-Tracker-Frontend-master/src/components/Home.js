import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Home = () => {
  const arr = [1000, 300, 1200, 300, 400, 120, 240, 500];
  const studentData = {
    labels: [
      "Food and Groceries",
      "Transport",
      "Education",
      "Entertainment",
      "Health and Medical",
      "Insurance",
      "Mobile and Wifi",
      "Other"
    ],
    datasets: [
      {
        label: 'Amount (₹)',
        data: arr,
        backgroundColor: 'yellow',
        hoverBackgroundColor: 'orange',
        borderColor: 'black',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' // ✅ Correct case
      },
      title: {
        display: true,
        text: 'Expense Tracker'
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'red',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      y: {
        ticks: {
          color: 'green',
          font: {
            size: 12,
            weight: ''
          },
          beginAtZero: true
        }
      }
    }
  };

  return (
    <div className="bg-blue-900 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-white mb-8 text-center">
        Welcome to Expense Tracker App
      </h1>

      {/* Chart Container with fixed medium size */}
      <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: '700px', height: '400px' }}>
        <Bar options={options} data={studentData} />
      </div>
    </div>
  );
};

export default Home;
