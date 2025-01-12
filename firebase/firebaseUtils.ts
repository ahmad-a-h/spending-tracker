// firebase/firebaseUtils.js

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from './firebase';

export interface Payment {
    amount: string;
    category: number;
    date: string;
    notes: string;
    isPayment: boolean;
    paymentMethod: string;
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
        const q = query(collection(db, "payments"), where("isPayment", "==", true));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => {
            const data = doc.data() as Omit<Payment, 'id'>; // Exclude 'id' from the type
            return { id: doc.id, ...data }; // Combine id with the rest of the data
        });
    } catch (e) {
        console.error("Error fetching payments: ", e);
        return [];
    }
};

export const getWeeklySpendingData = async (): Promise<number[]> => {
    const payments = await getPayments();
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Calculate the number of weeks in the current month
    const numberOfWeeks = Math.ceil((endOfMonth.getDate() - startOfMonth.getDate() + 1) / 7);
    const weeklyTotals: number[] = new Array(numberOfWeeks).fill(0);

    payments.forEach(payment => {
        const paymentDate = new Date(payment.date);
        if (isNaN(paymentDate.getTime())) {
            console.warn(`Invalid date for payment: ${payment.date}`);
            return;
        }
        
        if (paymentDate >= startOfMonth && paymentDate <= endOfMonth) {
            const amount = parseFloat(payment.amount); // Parse the amount as a number
            const weekIndex = Math.floor((paymentDate.getDate() - 1) / 7);
            
            if (weekIndex >= 0 && weekIndex < weeklyTotals.length) {
                weeklyTotals[weekIndex] += amount;
            } else {
                console.warn(`Calculated weekIndex out of bounds: ${weekIndex}`);
            }
        }
    });

    const totalPayments = weeklyTotals.reduce((acc, total) => acc + total, 0);
    const weeklyPercentages = totalPayments > 0 
        ? weeklyTotals.map(total => (total / totalPayments) * 100)
        : new Array(numberOfWeeks).fill(0); // Handle case where totalPayments is 0

    return weeklyPercentages;
};

export const getPaymentsByMonth = async (month: number) => {
    const payments = await getPayments();
    return payments.filter(payment => {
        const paymentDate = new Date(payment.date); // Convert the date string to a Date object
        return paymentDate.getMonth() === month; // Compare the month (0-11)
    });
};