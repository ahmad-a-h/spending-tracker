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
    const payments = await getPayments();
    setPayments(payments);
    setLoading(false);
  };
  useEffect(() => {
    if(payments.length === 0){
      fetchPayments();
    }
  }, [payments]);
  const handleMonthChange = async (month: number) => {
    setLoading(true);
    const payments = await getPaymentsByMonth(month);
    setPayments(payments);
    setLoading(false);
    console.log(payments);
  };
  return (
    <div className="h-full overflow-y-auto p-3 bg-white shadow-md w-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" /> {/* Show loader */}
        </div>
      ) : (
        <>
          <TotalMoney onAddClick={handleAddClick} paymentsData={payments} handleMonthChange={handleMonthChange} />
          <SpendingOverview paymentsData={payments} />
          <Footer />
          <AddPaymentForm isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
