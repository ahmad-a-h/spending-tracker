import { useEffect, useState } from 'react';
// import { getPayments, Payment } from '../../firebase/firebaseUtils'; // Adjust the import based on your actual function
import {Tab, TabGroup, TabList } from '@headlessui/react'; // Import Tab from Headless UI
import { Select, Statistic } from 'antd';
import CountUp from 'react-countup';

const formatter = (value: number | string) => (
  <CountUp end={typeof value === 'number' ? value : parseFloat(value)} separator="," prefix="$ " />
);

const TotalMoney = () => {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // const [selectedMonth, setSelectedMonth] = useState<string | null>('June'); // Allow null as a possible value
  const [selectedTab, setSelectedTab] = useState<'expenses' | 'income'>('expenses'); // State for selected tab
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        // const payments: Payment[] = await getPayments(); // Fetch payments from Firebase
        // const totalAmount = payments.reduce((acc: number, payment: Payment) => acc + payment.amount, 0);
        const totalAmount = 999.85;
        setTotal(totalAmount);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotal();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or skeleton loader
  }

  return (
    <div>
      <div className="bg-white p-4 rounded shadow-md mt-4">
      <Statistic title="Total Balance" value={total} precision={2} formatter={formatter} />
      </div>
      <div className="flex flex-col items-center mt-4 ml-1 w-full">
        <div className="flex space-x-4 justify-center items-center w-full">
          <TabGroup onChange={(index) => setSelectedTab(index === 0 ? 'expenses' : 'income')} className="w-2/3">
            <TabList className="flex space-x-4 bg-gray-200 rounded-full p-2 flex justify-center items-center">
              <Tab className={({ selected }) => 
                `px-4 py-2 rounded-full transition duration-300 w-1/2 focus:outline-none
                ${selected ? 'bg-black text-white' : 'bg-gray-200 text-black'}`
              }>
                Expenses
              </Tab>
              <Tab className={({ selected }) => 
                `px-4 py-2 rounded-full transition duration-300 w-1/2 focus:outline-none
                ${selected ? 'bg-black text-white' : 'bg-gray-200 text-black'}`
              }>
                Income
              </Tab>
            </TabList>
          </TabGroup>
          <Select
            defaultValue={new Date().toLocaleString('default', { month: 'long' })}
            options={months.map((month) => ({ value: month, label: month }))}
            className="ant-select-selector rounded-full bg-gray-200 text-black w-1/3"
            popupClassName="bg-gray-200 text-black rounded-md"
            style={{ border: 'none',  height: '55px' }} // Set dimensions and remove border
            dropdownStyle={{ borderRadius: '0.25rem'  }} // Match the rounded style for dropdown
          />
        </div>
    </div>
    </div>
  );
};

export default TotalMoney; 