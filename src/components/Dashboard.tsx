import React from 'react';
import AddPaymentForm from './AddPaymentForm';
import PaymentList from './PaymentList';

const Dashboard = () => {
  return (
    <div>
      <h1>Spending Tracker</h1>
      <AddPaymentForm />
      <PaymentList />
      {/* Add charts and spending summary here */}
    </div>
  );
};

export default Dashboard;
