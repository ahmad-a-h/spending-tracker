import React, { useEffect, useState } from 'react';
import { getPayments } from '../../firebase/firebaseUtils'; // Import the getPayments function

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentsData = await getPayments();
      setPayments(paymentsData);
    };
    fetchPayments();
  }, []);

  const handleDelete = async (id: string) => {
    // Implement delete functionality
  };

  return (
    <div>
      <h2>Payment History</h2>
      <ul>
        {payments.map(payment => (
          <li key={payment.id}>
            <span>{payment.title} - ${payment.amount} on {payment.date} ({payment.category})</span>
            <button onClick={() => handleDelete(payment.id)}>Delete</button>
            {/* Add edit functionality here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentList;
