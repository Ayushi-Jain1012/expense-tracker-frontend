import React, { useState } from "react";
import { 
  Box, Typography, Card, FormControl, Select, MenuItem, Modal, Button 
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useTransactions } from "./TransactionContext";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ChartAnalysis() {
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Example expense data (Replace with real data)
  const expenseData = [
    { month: "January", amount: 3000 },
    { month: "February", amount: 2500 },
    { month: "March", amount: 4000 },
    { month: "April", amount: 3200 },
    { month: "May", amount: 5000 },
    { month: "June", amount: 2800 },
    { month: "July", amount: 3500 },
    { month: "August", amount: 4200 },
    { month: "September", amount: 3700 },
    { month: "October", amount: 4500 },
    { month: "November", amount: 4800 },
    { month: "December", amount: 5200 },
  ];

  // Extract labels and values
  const labels = expenseData.map((item) => item.month);
  const dataValues = expenseData.map((item) => item.amount);

  // Chart Data
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Monthly Expenses (₹)",
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      {/* Card Container */}
      <Box sx={{ width: 400, textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          📊 Monthly Expense Analysis
        </Typography>

        

        {/* Open Modal Button */}
        <Button 
          variant="contained" 
          onClick={() => setOpen(true)} 
          sx={{ mt: 3, background: "#36687d", "&:hover": {
                  background: "linear-gradient(to right, #1b303b, #26414f, #35566c)", // Slightly lighter hover effect
                } }}
        >
          View Chart
        </Button>
      </Box>

      {/* Modal for Chart */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2
        }}>
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            Expense Comparison
          </Typography>
          <div style={{ height: "300px", marginTop: "20px" }}>
            <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <Button 
            onClick={() => setOpen(false)} 
            variant="outlined" 
            fullWidth 
            sx={{ mt: 3 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default ChartAnalysis;
