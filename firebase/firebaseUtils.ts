// firebase/firebaseUtils.js

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from './firebase';

export interface Payment {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    notes: string;
}

export const addPayment = async (payment: Payment) => {
    try {
        await addDoc(collection(db, "payments"), payment);
        console.log("Payment added!");
    } catch (e) {
        console.error("Error adding payment: ", e);
    }
};

// Function to get all payments
export const getPayments = async (): Promise<Payment[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "payments"));
        return querySnapshot.docs.map((doc) => {
            const data = doc.data() as Omit<Payment, 'id'>; // Exclude 'id' from the type
            return { id: doc.id, ...data }; // Combine id with the rest of the data
        });
    } catch (e) {
        console.error("Error fetching payments: ", e);
        return [];
    }
};

