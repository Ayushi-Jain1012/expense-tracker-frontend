import React, { useState } from "react";
import { 
  Box, Card, TextField,Button
} from "@mui/material";


import { useTransactions } from "./TransactionContext";

function AddTransaction({closeModal}) {

  const [ item, setItem] = useState("")
  const [amount, setAmount] = useState(null)
  const [currentDate,setCurrentDate] = useState(null)
  const { addTransaction } = useTransactions();

  const hanldeAddTrasaction = async (e) =>{
    if (!item || !amount) return;
    // const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}/${(currentDate.getMonth() + 1).toString().padStart(2, "0")}/${currentDate.getFullYear()}`; 
    await addTransaction(item, Number(amount), currentDate); 
    closeModal();
  }

  return (
    <Box sx={{ width:500, mx: "auto", mt: 2, textAlign: "center" ,left:"50%",top:"50%",  transform: 'translate(-50%, -50%)' ,position:"absolute"}}>
    <Card sx={{p:2, border:"none",boxShadow:2}}>
      

      <Box container mt={2} sx={{ width:"100%"}}>
        <TextField onChange={(e) => setItem(e.target.value)} value={item} type="text" id="outlined-basic" label="Item" variant="outlined"  sx={{width:"100%"}}/>
      </Box>

      <Box container mt={2} sx={{ width:"100%"}}>
        <TextField onChange={(e) => setAmount(e.target.value)} value={amount} type="number" id="outlined-basic" label="expense" variant="outlined"  sx={{width:"100%"}}/>
      </Box>

      <Box container mt={2} sx={{ width:"100%"}}>
        <TextField onChange={(e) => setCurrentDate(e.target.value)} value={currentDate} type="date" id="outlined-basic" label="expense" variant="outlined"  sx={{width:"100%"}}/>
      </Box>

        <Button onClick={hanldeAddTrasaction} variant="contained" color="success"  sx={{ mt: 2 , right:0}}>
            Add Transaction
        </Button>
    
      </Card>
    </Box>
  )
}

export default AddTransaction