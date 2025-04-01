import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
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
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error,setError] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const BASE_URL = 'https://expense-tracker-backend-3-bcjv.onrender.com'
  // const BASE_URL = 'http://localhost:5000'




   // Set auth token in headers for API requests
   const authHeaders = {
    headers: { "x-auth-token": token,  "Content-Type": "application/json", },
  };

  // Register User
  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error);
     
      setErrorMessage(error.response?.data?.message)
    }
  };

  // Login User
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      setToken(response.data.token);
      setUser(response.data.user);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user",response.data.user.name)
      return true
    } catch (error) {
      console.error("Error logging in:", error.response?.data?.message);
      setErrorMessage(error.response?.data?.message)
      return false
    }
  };

  const logoutUser = async () => {
    try {
        await axios.post(`${BASE_URL}/api/auth/logout`, {}, { headers: { "x-auth-token": token } });
    } catch (error) {
        console.error("Error logging out:", error);
    } finally {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    }
};



  // Fetch Expenses for Logged-in User
  const fetchExpenses = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/expenses/all`, authHeaders);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    if (token) fetchExpenses();
  }, [token]);

  const fetchCurrentMonthExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/expenses/getCurrentMonthData`, authHeaders);
      setCurrentMonthTransactions(response.data);
      console.log("fetched data",response.data)
    } catch (error) {
      console.error("Error fetching current expenses:", error);
    }
  };


  useEffect(() => {
    if (token) fetchCurrentMonthExpenses();
  }, [token ]);


  //  Add transaction
  const addTransaction = async (item, amount, date) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/expenses/add`, { item, amount, date }, authHeaders);
  
      setTransactions((prevTransactions) => [...prevTransactions, response.data.expense]); // Use functional update
      
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };
  


  //  get Previous Month Transactions
  const getPrevMonthTransaction = async (month, year) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/expenses/PrevDateMonth`, { month, year },authHeaders);
  
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
      await axios.delete(`${BASE_URL}/api/expenses/delete/${id}`,authHeaders);
      setTransactions(transactions.filter((expense) => expense._id !== id)); // Remove from state
      console.log("item deleted")
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  //  Set Budget 
  const SetBudget = async (newBudget) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/expenses/setbudget`, { budget : newBudget},authHeaders);
    
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
      const response = await axios.get(`${BASE_URL}/api/expenses/getbudget`,authHeaders);
      if (response.data.budget) {
        setMonthBudget(response.data.budget); // Ensure it updates correctly
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    if (token) GetBudget();
  }, [token ]);

  const fetchSavingsComparison = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/expenses/compareSavings`,authHeaders);
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
    if (token) fetchSavingsComparison();
  }, [token ]);

  return (
    <TransactionContext.Provider value={{ logoutUser,transactions,  addTransaction,getPrevMonthTransaction, deleteTransaction, monthBudget,SetBudget ,CurrentMonthTransactions,PrevMonthtransactions,PrevMonthBudget,savings,savingsComparison , user,registerUser,loginUser,errorMessage}}>
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook to use the context
export const useTransactions = () => {
  return useContext(TransactionContext);
};
