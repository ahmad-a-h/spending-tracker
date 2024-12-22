import React from 'react';
import AddPaymentForm from './AddPaymentForm';
import PaymentList from './PaymentList';
import TotalMoney from './TotalMoney';
import SpendingOverview from './SpendingOverview';

const Dashboard = () => {
  return (
    <div className="h-full overflow-y-auto mx-auto p-5 bg-white shadow-md rounded-lg w-full">
      <TotalMoney />
      <SpendingOverview />
      {/* <AddPaymentForm /> */}
      {/* Add charts and spending summary here */}
    </div>
  );
};

export default Dashboard;
