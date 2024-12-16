import React, { useState } from 'react';
import { addPayment } from '../../firebase/firebaseUtils'; // Import the addPayment function

const AddPaymentForm = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPayment = { title, amount: parseFloat(amount), category, date, notes };
    await addPayment(newPayment);
    // Reset form fields
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Payment Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit">Add Payment</button>
    </form>
  );
};

export default AddPaymentForm;
