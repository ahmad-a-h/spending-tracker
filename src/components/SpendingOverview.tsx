import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem, ArcElement, ChartOptions, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin
import { getWeeklySpendingData, Payment } from '../../firebase/firebaseUtils';
import { format } from 'date-fns';
import { Table } from 'antd';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ChartDataLabels);

ChartJS.register(ArcElement, Tooltip, Legend);
const SpendingOverview = ({ paymentsData, currentMonth }: { paymentsData: Payment[], currentMonth: number }) => {
  const [dailySpending, setDailySpending] = useState<{ [key: string]: number }>({});
  const [weeklyData, setWeeklyData] = useState<number[]>(); // Static data for demonstration
  const [categoryTotals, setCategoryTotals] = useState<{ [key: string]: number }>({});
  const today = new Date(currentMonth);
  console.log("today", today);
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  useEffect(() => {
    const fetchSpendingData = async () => {
      try {
        // Fetch data from Firebase
        console.log("currentMonth", currentMonth);
        const response = await getWeeklySpendingData(currentMonth); // Replace with your actual fetching function
        setWeeklyData(response); // Update state with fetched data
        
        const spending: { [key: string]: number } = {};

        const totals = paymentsData.reduce((acc, payment) => {
          const category = payment.category;
          acc[category] = (acc[category] || 0) + parseFloat(payment.amount);
          return acc;
        }, {} as { [key: string]: number });
        setCategoryTotals(totals);
        
        paymentsData.forEach(payment => {
          const paymentDate = new Date(payment.date);
          const dateKey = paymentDate.toISOString().split('T')[0];

          const normalizedPaymentDate = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), paymentDate.getDate());

          if (normalizedPaymentDate >= startOfMonth && normalizedPaymentDate <= endOfMonth) {
            spending[dateKey] = (spending[dateKey] || 0) + parseFloat(payment.amount);
          }
        });
        
        setDailySpending(spending);
        
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

        // setPayments(paymentsData as Payment[]);
  
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
  }, [paymentsData]);
  

  const numberOfWeeks = Math.ceil((endOfMonth.getDate() - startOfMonth.getDate() + 1) / 7);
  const labels: string[] = [];
  for (let i = 0; i < numberOfWeeks; i++) {
    const startDay = i * 7 + 1;
    labels.push(startDay.toString());
  }
  const data = {
    
    labels: labels, // X-axis labels
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
        borderRadius: 20,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
        borderSkipped: false,
      },
    ],
    
  };
  const options: ChartOptions<'bar'> = {
    responsive: true,
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
          return `${value.toFixed(0)}%`; // Display percentage on the bars
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
  const categories = [
    { id: 1, label: 'Food', color: '#FF6384' },
    { id: 2, label: 'Clothes', color: '#36A2EB' },
    { id: 3, label: 'Monthly Subscriptions', color: '#FFCE56' },
    { id: 4, label: 'Other', color: '#FF9F40' },
  ];
  const filteredCategories = categories.filter(category => categoryTotals[category.id] > 0);

  const pieData = {
    labels: filteredCategories.map(category => category.label),
    datasets: [
      {
        label: 'Category Spending',
        data: filteredCategories.map(category => categoryTotals[category.id]),
        backgroundColor: filteredCategories.map(category => category.color),
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
  const pieOptions: ChartOptions<'pie'> = {
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
            const total = Object.values(categoryTotals).reduce((sum, val) => sum + Number(val), 0);
            const percentage = total > 0 ? ((Number(value) / total) * 100).toFixed(2) : '0.00';
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : '0.00';
          return `${percentage}%`;
        },
        color: 'white',
      },
    },
  };
  
  const todayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [dailySpending]);
  
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const currentMonthPayments = paymentsData.filter(payment => {
    const paymentDate = new Date(payment.date);
    return paymentDate.getMonth() === today.getMonth() && paymentDate.getFullYear() === today.getFullYear();
  });
  const sortedPayments = useMemo(() => {
    return [...currentMonthPayments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [currentMonthPayments]);
  
  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => `$${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => format(new Date(text), 'dd/MM/yyyy'),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
  ];

  return (
    <>
    <div className="flex flex-col items-center mt-6">
      <Bar data={data} options={options} />
      <div className="flex overflow-x-auto space-x-4 mt-4 mb-4 w-full h-24">
      {Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
        const dateKey = format(date, 'yyyy-MM-dd');
        const spending = dailySpending[dateKey] || 0;
        const isToday = dateKey === format(today, 'yyyy-MM-dd');
        
        return (
          <div
            key={i}
            ref={isToday ? todayRef : null}
            className={`flex flex-col items-center w-1/3 min-w-[100px] bg-gray-200 rounded-2xl flex items-center justify-center text-black text-lg font-bold ${isToday ? 'bg-blue-200' : ''}`}
          >
            <span className="mt-2 mb-3 text-gray-600">{format(date, 'dd/MM')}</span>
            <span>${spending.toFixed(2)}</span>
          </div>
        );
      })}
      </div>
    </div>
    <div className="mt-4 mb-16">
        <Pie data={pieData} options={pieOptions} />
    </div>
    <div className="mt-6 w-full mb-10">
        <h2 className="text-m font-bold text-black mb-4">Payments for Current Month</h2>
        <Table dataSource={sortedPayments} columns={columns} rowKey="id" />
      </div>
  </>
  );
};

export default SpendingOverview; 