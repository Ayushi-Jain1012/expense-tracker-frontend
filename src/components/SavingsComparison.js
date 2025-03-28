import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Box, Typography,Card, Button } from "@mui/material";
import { useTransactions } from "./TransactionContext";
import Modal from "@mui/material/Modal";

function SavingsComparison() {
    const { savingsComparison } = useTransactions();
    const [showConfetti, setShowConfetti] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const today = new Date();
      const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
      if (today.getDate() === lastDate) {
        setOpen(true); // Open modal on last date of the month
      } else {
        setOpen(false);
      }
    
      // Only show confetti if isHigher is true
      if (savingsComparison?.isHigher === true ) {  
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        setShowConfetti(false); // Ensure confetti stops if isHigher is false
      }
    }, [savingsComparison]); 
    
  

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
      {showConfetti && <Confetti />}
      
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              width: 500,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              position: "absolute",
              textAlign: "center",
              
            }}
          >
            <Card sx={{ p: 2, border: "none", boxShadow: 2 }}>
                <Box sx={{ textAlign: "center", mt: 5 }}>
                  
                  <Typography variant="h6" color={savingsComparison.isHigher ? "green" : "red"}>
                      {savingsComparison.message}
                  </Typography>
                  <Typography variant="body1">Previous Month Savings: ₹{savingsComparison.prevSavings}</Typography>
                  <Typography variant="body1">Current Month Savings: ₹{savingsComparison.currentSavings}</Typography>
                  <Button onClick={() => setOpen(false)} sx={{
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
                  }}>Close</Button>
              </Box>
            </Card>
          </Box>
        </Modal>
        </>
    );
}

export default SavingsComparison;
