import React, { useState,useEffect } from "react";
import { 
  Box, Card, CardContent, Typography, Button, TextField,  Grid2 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTransaction from "./AddTransaction";
import Modal from '@mui/material/Modal';

import { useTransactions } from "./TransactionContext";



const ExpenseOverview = () => {
 
  const {CurrentMonthTransactions,SetBudget,monthBudget}  = useTransactions();
  const [openModal, setOpenModal] = useState(false)
  const [openBudgetModal, setOpenBudgetModal] = useState(false)
  const [budget,setBudget] = useState()

  const totalExpense =  CurrentMonthTransactions.reduce((acc, t) => acc + t.amount, 0);
  const balance = monthBudget - totalExpense;
  
  const handleAdd =() =>{
    setOpenModal(true)
  }

  const handleBudgetModalClose = () =>{
    setOpenBudgetModal(false)
  }

  const handleClose = () =>{
    setOpenModal(false)
  }

 
  const handleSetBudget = () =>{
    setOpenBudgetModal(true)
   
  }

  

  const handleAddBudget = async () => {
    if (!budget) return;
    await SetBudget( Number(budget)); 
    setBudget("")
    setOpenBudgetModal(false)
  }
  
  return (
    <Box >
        <Typography variant="h5" fontWeight="bold">
            Budget & Expenses
        </Typography>

        <Grid2 container mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
          <Grid2 item xs={6} sx={{ width: "40%" }}>
            <Typography variant="h6" mt={2} sx={{ textAlign: "left" }}>
              Balance: <b>₹{balance}</b>
            </Typography>
          </Grid2>
          <Grid2 item xs={6} sx={{ width: "40%", textAlign: "right", }}>
            <Button onClick={handleAdd} variant="contained"  startIcon={<AddIcon />} sx={{
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
                ADD
            </Button>
            <Button onClick={handleSetBudget} variant="contained"   sx={{
                mt: 2,
                ml:2,
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
              Set Budget
            </Button>
          
          </Grid2>
        </Grid2>

        <Grid2 container spacing={1} mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
          <Grid2 item xs={6} sx={{ width: "45%" }}>
            <Card>
              <CardContent sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1">Expense</Typography>
                <Typography variant="h6" color="error">
                  ₹{totalExpense}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={6} sx={{ width: "45%" }}>
            <Card>
              <CardContent sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1">Budget</Typography>
                <Typography variant="h6" color="success.main">
                  ₹{monthBudget}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>

        <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <AddTransaction closeModal={() => setOpenModal(false)} />
        </Modal>

        <Modal open={openBudgetModal} onClose={handleBudgetModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box container mt={2} sx={{ width:500, mx: "auto", mt: 2, textAlign: "center" ,left:"50%",top:"50%",  transform: 'translate(-50%, -50%)' ,position:"absolute"}}>
            <Card sx={{p:2, border:"none",boxShadow:2}}>
              <Box container sx={{ width:"100%", display:'flex', justifyContent:'space-around', textAlign:'center',}}>
               <TextField onChange={(e) => setBudget(e.target.value)} value={budget} type="number" variant="standard" id="outlined-basic" label="Budget"   sx={{width:"100%", "& fieldset": { border: 'none' }, }}/>
              <AddCircleIcon onClick={handleAddBudget} color="success" fontSize="medium" sx={{textAlign:'center',mt:2,fontSize:30}}/>
              </Box>
            </Card>
          </Box>
        </Modal>

    </Box>
  );
};

export default ExpenseOverview;
