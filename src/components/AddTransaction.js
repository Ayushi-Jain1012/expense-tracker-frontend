import React, { useState } from "react";
import { 
  Box, Card, TextField, Button
} from "@mui/material";
import { useTransactions } from "./TransactionContext";

function AddTransaction({ closeModal }) {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const { addTransaction } = useTransactions();

  const handleAddTransaction = async (e) => {
    if (!item || !amount) return;
    await addTransaction(item, Number(amount), currentDate);
    closeModal();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)',
        width: { xs: "90%", sm: 500 }, // Width for mobile and larger screens
        mx: "auto",
        mt: 2,
        textAlign: "center",
      }}
    >
      <Card sx={{ p: 2, border: "none", boxShadow: 2 }}>
        <Box sx={{ width: "100%" }}>
          <TextField
            onChange={(e) => setItem(e.target.value)}
            value={item}
            type="text"
            id="outlined-basic"
            label="Item"
            variant="outlined"
            sx={{ width: "100%", mb: 2 }} // margin bottom for spacing
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <TextField
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            id="outlined-basic"
            label="Expense"
            variant="outlined"
            sx={{ width: "100%", mb: 2 }} // margin bottom for spacing
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <TextField
            onChange={(e) => setCurrentDate(e.target.value)}
            value={currentDate}
            type="date"
            id="outlined-basic"
            label="Date"
            variant="outlined"
            sx={{ width: "100%", mb: 2 }} // margin bottom for spacing
          />
        </Box>

        <Button
          onClick={handleAddTransaction}
          variant="contained"
          color="success"
          sx={{
            mt: 2,
            width: "100%", // Make the button span full width on mobile
            padding: { xs: "10px", sm: "15px" }, // Responsive padding for mobile and desktop
          }}
        >
          Add Transaction
        </Button>
      </Card>
    </Box>
  );
}

export default AddTransaction;
