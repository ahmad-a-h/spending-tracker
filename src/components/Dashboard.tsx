import React, { useEffect, useState } from 'react';
import AddPaymentForm from './AddPaymentForm';
import TotalMoney from './TotalMoney';
import SpendingOverview from './SpendingOverview';
import Footer from './Footer';
import { addPayment, getPayments, getPaymentsByMonth, Payment } from '../../firebase/firebaseUtils';
import { Spin } from 'antd'; // Import Ant Design's Spin component

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const handleAddClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = (values: Payment ) => {
    setIsModalOpen(false);
    if(values.amount !== ''){
      addPayment(values);
    }
    fetchPayments();
  };
  const fetchPayments = async () => {
    const payments = await getPaymentsByMonth(currentMonth);
    setPayments(payments);
    setLoading(false);
  };
  useEffect(() => {
    fetchPayments();
  }, [currentMonth]);
  
  const handleMonthChange = async (month: number) => {
    setCurrentMonth(month);
    const payments = await getPaymentsByMonth(month);
    setPayments(payments);
  };
  return (
    <div className="h-full overflow-y-auto p-3 bg-white shadow-md w-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" /> {/* Show loader */}
        </div>
      ) : (
        <>
          <TotalMoney onAddClick={handleAddClick} paymentsData={payments} handleMonthChange={handleMonthChange} currentMonth={currentMonth} />
          <SpendingOverview paymentsData={payments} currentMonth={currentMonth} />
          <Footer />
          <AddPaymentForm isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
