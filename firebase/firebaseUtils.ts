// firebase/firebaseUtils.js

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
export const addPayment = async (payment: Payment) => {
    try {
        await addDoc(collection(db, "payments"), payment);
        console.log("Payment added!");
    } catch (e) {
        console.error("Error adding payment: ", e);
    }
};

// Function to get all payments
export const getPayments = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "payments"));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error fetching payments: ", e);
        return [];
    }
};
interface Payment {
    title: string;
    amount: number;
    category: string;
    date: string;
    notes: string;
  }
  

