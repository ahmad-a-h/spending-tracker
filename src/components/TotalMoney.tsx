import { useEffect, useState } from 'react';
// import { getPayments, Payment } from '../../firebase/firebaseUtils'; // Adjust the import based on your actual function
import {Tab, TabGroup, TabList } from '@headlessui/react'; // Import Tab from Headless UI
import { Select, Statistic } from 'antd';
import CountUp from 'react-countup';
import { getPayments, Payment } from '../../firebase/firebaseUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const formatter = (value: number | string) => (
  <CountUp end={typeof value === 'number' ? value : parseFloat(value)} separator="," prefix="$ " />
);
interface ClickProps {
  onAddClick: () => void;
  paymentsData: Payment[];
  handleMonthChange: (month: number) => void;
  currentMonth: number;
}
const TotalMoney = ({ onAddClick, paymentsData, handleMonthChange, currentMonth }: ClickProps) => {
  const [total, setTotal] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth); // Set to current month number
  const [selectedTab, setSelectedTab] = useState<'expenses' | 'income'>('expenses'); // State for selected tab
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  useEffect(() => {
    const totalAmount = paymentsData.reduce((acc: number, payment: Payment) => acc + parseFloat(payment.amount), 0);
    setTotal(totalAmount);
  }, [paymentsData]);
  
  return (
    <div>
      <div className="bg-white p-4 rounded  mt-2 flex justify-between items-center">
        <div className="flex flex-col items-center justify-center mx-auto">
          <Statistic value={total} precision={2} formatter={formatter} />
          <span className="text-xs font-semibold text-gray-500 flex flex-col items-center">Total Balance</span>
        </div>
        <div onClick={onAddClick}>
          <FontAwesomeIcon icon={faEdit} style={{ color: 'black', fontSize: '20px' }} onClick={onAddClick}/>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 ml-1 w-full">
        <div className="flex space-x-4 justify-center items-center w-full">
          <TabGroup onChange={(index) => setSelectedTab(index === 0 ? 'expenses' : 'income')} className="w-3/5">
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
            value={currentMonth}
            onChange={(value) => {
              setSelectedMonth(value);
              handleMonthChange(value);
            }}
            options={months.map((month, index) => ({ value: index+1, label: month }))}
            className="ant-selectselector rounded-full bg-gray-200 text-black w-2/5"
            popupClassName="bg-gray-200 text-black rounded-md"
            style={{ border: 'none',  height: '55px' }} // Set dimensions and remove border
          />
        </div>
      </div>
    </div>
  );
};

export default TotalMoney; 