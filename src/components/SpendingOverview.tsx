import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin
import { Payment } from '../../firebase/firebaseUtils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ChartDataLabels);

ChartJS.register(ArcElement, Tooltip, Legend);
const SpendingOverview = () => {
  const [dailyTotal, setDailyTotal] = useState<number>(0);
  const [weeklyTotal, setWeeklyTotal] = useState<number>(0);
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const [weeklyData, setWeeklyData] = useState<number[]>([12, 3, 5, 32, 21, 7, 13, 5]); // Static data for demonstration
  const [categoryTotals, setCategoryTotals] = useState<{ [key: string]: number }>({
    Food: 200,
    Housing: 300,
    Entertainment: 150,
    // Add more categories as needed
  });
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchSpendingData = async () => {
      try {
        // Fetch data from Firebase
        // const response = await getWeeklySpendingData(); // Replace with your actual fetching function
        // setWeeklyData(response.data); // Update state with fetched data
        
        // const payments: Payment[] = await getPayments();
        // const today = new Date();
        // const startOfWeek = new Date(today);
        // startOfWeek.setDate(today.getDate() - today.getDay());
        // const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // const daily = payments.reduce((acc, payment) => {
        //   const paymentDate = new Date(payment.date);
        //   return paymentDate.toDateString() === today.toDateString() ? acc + payment.amount : acc;
        // }, 0);

        // const weekly = payments.reduce((acc, payment) => {
        //   const paymentDate = new Date(payment.date);
        //   return paymentDate >= startOfWeek ? acc + payment.amount : acc;
        // }, 0);

        // const monthly = payments.reduce((acc, payment) => {
        //   const paymentDate = new Date(payment.date);
        //   return paymentDate >= startOfMonth ? acc + payment.amount : acc;
        // }, 0);

        const daily = 52.00; // Example static data for daily total
        const weekly = 403.00; // Example static data for weekly total
        const monthly = 1612.00;

        setDailyTotal(daily);
        setWeeklyTotal(weekly);
        setMonthlyTotal(monthly);

        const paymentsData = [
          { id: '1', title: 'Groceries', amount: 100, category: 'Food', date: '2024-01-01', notes: 'Grocery shopping' },
          { id: '2', title: 'Rent', amount: 1200, category: 'Housing', date: '2024-01-02', notes: 'Monthly rent payment' },
        ];
        setPayments(paymentsData as Payment[]);
  
        // Calculate category totals

        // const totals = paymentsData.reduce((acc, payment) => {
        //   acc[payment.category] = (acc[payment.category] || 0) + payment.amount;
        //   return acc;
        // }, {} as {[key: string]: number});
        
        // setCategoryTotals(totals);

      } catch (error) {
        console.error("Error fetching spending data:", error);
      }
    };

    fetchSpendingData();
  }, []);
  const data = {
    labels: ['1', '5', '10', '15', '20', '25', '31'], // X-axis labels
    datasets: [
      {
        label: 'Weekly Spending (%)',
        data: weeklyData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
    
  };
  const options = {
    responsive: true,
    borderRadius: 20,
    barPercentage: 0.6,
    categoryPercentage: 0.6,
    borderSkipped: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end', // Ensure this aligns with allowed types
        formatter: (value: number) => {
          return `${value}%`; // Display percentage on the bars
        },
        color: 'black', // Set the color of the labels
        font: {
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        display: false, // Hide y-axis
      },
      x: {
        ticks: {
          font: {
            weight: 'bold', // Make x-axis labels bold
          },
        },
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
    },
    layout: {
      padding: {
        top: 10, // Add padding top to the chart
      },
    },
  };

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Category Spending',
        data: Object.values(categoryTotals),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: 'white',
      },
    },
  };
  
  return (
    <>
    <div className="flex flex-col items-center mt-6">
      {/* <h2 className="text-xl font-semibold text-black">Spending Overview</h2> */}
      
      <Bar data={data} options={options} />
      <div className="flex space-x-4 mt-4 mb-4 w-full justify-center h-24">
        <div className="flex flex-col items-center w-1/3">
          <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center flex-col justify-center text-black text-lg font-bold">
            <span className="mt-2 mb-3 text-gray-600">Day</span>
            ${dailyTotal.toFixed(2)}
          </div>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center flex-col text-black text-lg font-bold">
            <span className="mt-2 mb-3 text-gray-600">Week</span>
            ${weeklyTotal.toFixed(2)}
          </div>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center text-black text-lg font-bold flex-col">
            <span className="mt-2 mb-3 text-gray-600">Month</span>
            <span className="text-lg font-bold">${monthlyTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
    <div className="mt-4 mb-16">
        <Pie data={pieData} options={pieOptions} />
      </div>
  </>
  );
};

export default SpendingOverview; 