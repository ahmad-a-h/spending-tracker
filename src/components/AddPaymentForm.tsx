import React, { useState } from 'react';
import { addPayment, Payment } from '../../firebase/firebaseUtils';
import { Modal, Button, Input, Form, DatePicker, TextArea } from 'antd';

const { TextArea: AntdTextArea } = Input;

const AddPaymentForm = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (values: any) => {
    const newPayment: Payment = { id: '', title: values.title, amount: parseFloat(values.amount), category: values.category, date: values.date.format('YYYY-MM-DD'), notes: values.notes };
    await addPayment(newPayment);
    resetForm();
    setIsOpen(false);
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setNotes('');
  };

  return (
    <>
      <Button 
        type="primary" 
        onClick={() => setIsOpen(true)} 
        className="mb-4"
      >
        Add Payment
      </Button>

      <Modal
        title="Add Payment"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null} // Set to null to use custom footer
      >
        <Form onFinish={handleSubmit}>
          <Form.Item 
            name="title" 
            rules={[{ required: true, message: 'Please input the payment title!' }]}
          >
            <Input 
              placeholder="Payment Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </Form.Item>
          <Form.Item 
            name="amount" 
            rules={[{ required: true, message: 'Please input the amount!' }]}
          >
            <Input 
              type="number" 
              placeholder="Amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
          </Form.Item>
          <Form.Item 
            name="category" 
            rules={[{ required: true, message: 'Please input the category!' }]}
          >
            <Input 
              placeholder="Category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
            />
          </Form.Item>
          <Form.Item 
            name="date" 
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker 
              onChange={(date) => setDate(date)} 
              className="w-full" 
            />
          </Form.Item>
          <Form.Item>
            <AntdTextArea 
              placeholder="Notes (optional)" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
            />
          </Form.Item>
          <div className="flex justify-end">
            <Button 
              type="primary" 
              htmlType="submit" 
              className="mr-2"
            >
              Add Payment
            </Button>
            <Button 
              type="default" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddPaymentForm;
