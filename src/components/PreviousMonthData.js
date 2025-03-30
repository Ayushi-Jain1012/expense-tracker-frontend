import React, { useState } from "react";
import { 
  Box, Typography, FormControl, Select, MenuItem, Modal, Grid2 ,Button
} from "@mui/material";
import { 
  List, ListItem, 
    ListItemText,
} from "@mui/material";
import { useTransactions } from "./TransactionContext";


function PreviousMonthData() {
  const { getPrevMonthTransaction,PrevMonthtransactions ,PrevMonthBudget,savings} = useTransactions();
  const [selectedMonth, setSelectedMonth] = useState(""); // Store selected month
  const [selectedYear, setSelectedYear] = useState(""); // Store selected year
  const [open, setOpen] = useState(false); // Controls modal visibility


 
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  
  const years = ["2025", "2024", "2023", "2022", "2021"];



    function getMonthNumber(monthName) {
      return new Date(`${monthName} 1, 2000`).getMonth() + 1;
  }


    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; 
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

  const handleMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleYearChange = (event) => setSelectedYear(event.target.value);

  // 🔹 Handle Submit (Show Popup when both month & year are selected)
  const handleSubmit = async() => {
    if (selectedMonth && selectedYear) {
      setOpen(true);
    }

    await getPrevMonthTransaction(getMonthNumber(selectedMonth),selectedYear); 
    
  };

  // 🔹 Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{  textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold">
        Transaction History
      </Typography>

      <Grid2 container spacing={1} mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
          <Grid2 item xs={6} sx={{ width: "45%" }}>
            <FormControl fullWidth>
                <Select 
                value={selectedYear} 
                onChange={handleYearChange} 
                displayEmpty
                >
                <MenuItem value="" disabled>Select Year</MenuItem>
                {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
                </Select>
            </FormControl>
          </Grid2>
          <Grid2 item xs={6} sx={{ width: "45%" }}>
            <FormControl fullWidth>
                <Select 
                value={selectedMonth} 
                onChange={handleMonthChange} 
                displayEmpty
                >
                <MenuItem value="" disabled>Select Month</MenuItem>
                {months.map((month) => (
                    <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
                </Select>
            </FormControl>
          </Grid2>
        </Grid2>

      
      <Box mt={2}>
        <Button  onClick={handleSubmit} variant="contained"   sx={{
                mt: 2,
                background: "#36687d",
                color: "#fff",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  background: "linear-gradient(to right, #1b303b, #26414f, #35566c)", // Slightly lighter hover effect
                },
              }}>
            View Transaction
        </Button>
      </Box>

      <List sx={{ width: '100%', mt:5 }}>
        <ListItem
          secondaryAction={
            <Typography >{selectedMonth ? selectedMonth :"NA"}</Typography>
          }
        >
          <ListItemText primary="Month"/>
        </ListItem>
        <ListItem
          secondaryAction={
            <Typography >{PrevMonthBudget? `₹${PrevMonthBudget}` :"₹0"}</Typography>
          }
        >
          <ListItemText primary="Budget" />
        </ListItem>
        <ListItem
          secondaryAction={
            <Typography >{savings? `₹${savings}` :"₹0"}</Typography>
          }
        >
          <ListItemText primary="Savings"/>
        </ListItem>
      
    </List>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="month-data-title"
        aria-describedby="month-data-description"
      >
        <Box 
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            minWidth: 300,
            textAlign: "center",
            borderRadius: 2
          }}
        >
           {PrevMonthtransactions.length !== 0 ? <List sx={{
                maxHeight: 300,
                overflowY: 'auto',
                marginTop: 1,
                '&::-webkit-scrollbar': { width: '0px' },
                '&::-webkit-scrollbar-thumb': { background: 'transparent' },
                '&::-webkit-scrollbar-track': { background: 'transparent' }
            }}>
                
                {/* Column Titles */}
                <ListItem sx={{ fontWeight: 'bold', borderBottom: '2px solid #ccc', display: 'flex' }}>
                    <ListItemText primary="Item" sx={{ flex: 2, fontWeight: 'bold' }} />
                    <ListItemText primary="Amount" sx={{ flex: 2, textAlign: 'center', fontWeight: 'bold' }} />
                    <ListItemText primary="Date" sx={{ flex: 2, textAlign: 'center', fontWeight: 'bold' }} />
                   
                </ListItem>

                { PrevMonthtransactions.map((transaction) => (
                    <ListItem key={transaction._id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemText primary={transaction.item} sx={{ flex: 2 }} />
                        <ListItemText primary={`₹${transaction.amount}`} sx={{ flex: 2, textAlign: 'center' }} />
                        <ListItemText primary={formatDate(transaction.date)} sx={{ flex: 2, textAlign: 'center' }} />
                    </ListItem>
                ))}   
        </List> : "No Data present" }
        </Box>
       
      </Modal>
    </Box>
  );
}

export default PreviousMonthData;
