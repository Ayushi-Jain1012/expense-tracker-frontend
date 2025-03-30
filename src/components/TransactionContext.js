import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
// const axios = require("axios");
import axios from 'axios'

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [PrevMonthtransactions, setPrevMonthTransactions] = useState([]);
  const [PrevMonthBudget,setPrevMonthBudget] = useState(null)
  const [savings,setSavings] = useState(null)
  const [CurrentMonthTransactions, setCurrentMonthTransactions] = useState([]);
  const [monthBudget,setMonthBudget] = useState(null)
  const [savingsComparison, setSavingsComparison] = useState({
    currentSavings: 0,
    prevSavings: 0,
    isHigher: false,
    message: "",
  });
  const BASE_URL = 'https://expense-tracker-backend-3-bcjv.onrender.com'
  // const BASE_URL = 'http://localhost:5000'

  //  Fetch data once when app starts
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/expenses/all`);
      setTransactions(response.data);
      console.log("fetched data",response.data)
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch only once
  }, []);

  const fetchCurrentMonthExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/expenses/getCurrentMonthData`);
      setCurrentMonthTransactions(response.data);
      console.log("fetched data",response.data)
    } catch (error) {
      console.error("Error fetching current expenses:", error);
    }
  };




  useEffect(() => {
    fetchCurrentMonthExpenses(); // Fetch only once
  }, [CurrentMonthTransactions]);


  //  Add transaction
  const addTransaction = async (item, amount, date) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/expenses/add`, { item, amount, date });
  
      setTransactions((prevTransactions) => [...prevTransactions, response.data.expense]); // Use functional update
      
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };
  


  //  get Previous Month Transactions
  const getPrevMonthTransaction = async (month, year) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/expenses/PrevDateMonth`, { month, year });
  
      if (response.data.expenses && Array.isArray(response.data.expenses)) {
        setPrevMonthTransactions(response.data.expenses);
        setPrevMonthBudget(response.data.budget)
        setSavings(response.data.savings)
      } else {
        setPrevMonthTransactions([]); // Ensure an empty array if no transactions
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setPrevMonthTransactions([]); // Handle errors gracefully
    }
  };
  


  //  Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/expenses/delete/${id}`);
      setTransactions(transactions.filter((expense) => expense._id !== id)); // Remove from state
      console.log("item deleted")
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  //  Set Budget 
  const SetBudget = async (newBudget) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/expenses/setbudget`, { budget : newBudget});
    
    if (response.data.monthBudget) {
        setMonthBudget(response.data.monthBudget.budget); // Update state instantly
      }
    console.log("Budget for current month",response.data.monthBudget.budget)
    } catch (error) {
      console.error("Error setting budget:", error);
    }
  };

   //  Fetch data once when app starts
   const GetBudget = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/expenses/getbudget`);
      if (response.data.budget) {
        setMonthBudget(response.data.budget); // Ensure it updates correctly
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    GetBudget(); // Fetch only once
  }, []);

  const fetchSavingsComparison = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/expenses/compareSavings`);
      if (response.data) {
        setSavingsComparison(response.data);
        console.log(response.data.isHigher)
      }
    } catch (error) {
      console.error("Error fetching savings comparison:", error);
    }
  };

  // Fetch all data when app starts
  useEffect(() => {
    fetchSavingsComparison(); 
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions,  addTransaction,getPrevMonthTransaction, deleteTransaction, monthBudget,SetBudget ,CurrentMonthTransactions,PrevMonthtransactions,PrevMonthBudget,savings,savingsComparison}}>
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook to use the context
export const useTransactions = () => {
  return useContext(TransactionContext);
};
