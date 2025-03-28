import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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

  //  Fetch data once when app starts
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses/all");
      setTransactions(response.data);
      console.log("fetched data",response.data)
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchCurrentMonthExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses/getCurrentMonthData");
      setCurrentMonthTransactions(response.data);
      console.log("fetched data",response.data)
    } catch (error) {
      console.error("Error fetching current expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch only once
  }, []);


  useEffect(() => {
    fetchCurrentMonthExpenses(); // Fetch only once
  }, []);


  //  Add transaction
  const addTransaction = async (item, amount,date) => {
    try {
      const response = await axios.post("http://localhost:5000/api/expenses/add", { item, amount,date });
      setTransactions([...transactions, response.data.expense]); // Update state instantly
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };


  //  get Previous Month Transactions
  const getPrevMonthTransaction = async (month, year) => {
    try {
      const response = await axios.post("http://localhost:5000/api/expenses/PrevDateMonth", { month, year });
  
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
      await axios.delete(`http://localhost:5000/api/expenses/delete/${id}`);
      setTransactions(transactions.filter((expense) => expense._id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  //  Set Budget 
  const SetBudget = async (newBudget) => {
    try {
      const response = await axios.post("http://localhost:5000/api/expenses/setbudget", { budget : newBudget});
    
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
      const response = await axios.get("http://localhost:5000/api/expenses/getbudget");
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
      const response = await axios.get("http://localhost:5000/api/expenses/compareSavings");
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
