import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Select, Form, DatePicker } from 'antd';
import { Payment } from '../../firebase/firebaseUtils';

interface AddPaymentFormProps {
  isOpen: boolean;
  onClose: (values: Payment) => void;
}

const AddPaymentForm: React.FC<AddPaymentFormProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [category, setCategory] = useState<number>(1); // Default to the first category
  const [comment, setComment] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [form] = Form.useForm();
  // Reset form values when the modal opens
  useEffect(() => {
    if (isOpen) {
      form.resetFields();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const values: Payment = { amount, category, notes: comment, isPayment: true, date: date.toISOString(), paymentMethod, id: '' };
    console.log(values);
    onClose(values); // Pass the values to the onClose function
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={() => onClose({ amount: '', category: 1, notes: '', isPayment: true, date: new Date().toISOString(), paymentMethod: '', id: '' })}
      footer={null}
      className="rounded-lg"
    >
      <Form onFinish={handleSubmit} form={form}>
        <div className="flex mb-2 w-11/12">
          <Form.Item
            name="paymentMethod"
            rules={[{ required: true, message: 'Please select a payment method!' }]}
            className="w-1/2"
          >
            <Select
              className="rounded-full ml-1"
              style={{ backgroundColor: '#E0ECFF' }}
              placeholder="Select Payment Method"
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value)}
            >
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            rules={[{ required: true, message: 'Please select a category!' }]}
            className="w-1/2"
          >
            <Select
              className="rounded-full ml-3"
              style={{ backgroundColor: '#E0FFE0' }}
              placeholder="Select Category"
              value={category}
              onChange={(value) => setCategory(value)}
            >
              <Select.Option value={1}>Food</Select.Option>
              <Select.Option value={2}>Clothes</Select.Option>
              <Select.Option value={3}>Monthly Subscriptions</Select.Option>
              <Select.Option value={4}>Other</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: 'Please enter an amount!' }]}
        >
          <Input
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            className="text-4xl text-center border-none"
            placeholder="$0.00"
          />
        </Form.Item>
        <div className="flex justify-center items-center">
          <Form.Item
            name="comment"
            rules={[{ required: true, message: 'Please add a comment!' }]}
          >
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="text-center border-none"
              placeholder="Add a comment..."
            />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[{ required: true, message: 'Please Pick a Date!' }]}
          >
            <DatePicker onChange={(value) => setDate(value.toDate())} />
          </Form.Item>  
        </div>
        <div className="text-center mb-4">
          <Button
            type="primary"
            className="w-full bg-black flex justify-center items-center"
            htmlType="submit"
          >
            <span className="text-white">Submit</span>
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddPaymentForm;