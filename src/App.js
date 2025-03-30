import React from "react";
import ExpennseOverview from "./components/ExpennseOverview";
import ShowTransactions from "./components/ShowTransactions";
import PreviousMonthData from "./components/PreviousMonthData";
import ChartAnalysis from "./components/ChartAnalysis";
// import SavingsComparison from "./components/SavingsComparison";
import SavingsComparison from "./components/SavingsComparison";

import { Box, Card, Typography } from "@mui/material";
import { TransactionProvider } from "./components/TransactionContext";




function App() {
  
  return (
    <TransactionProvider>
    
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
        }}
      >
          <Box>
              <SavingsComparison />
          </Box>
        
            

        <Typography
          variant="h3"
          fontWeight="bold"
          color="white"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Expense Tracker
        </Typography>

        {/* Main Content with Cards */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 2,
            textAlign: "center",
            mt: 4,
          }}
        >
          <Box sx={{ width: 700 }}>
            <Card sx={{ p: 2 }}>
              <ExpennseOverview />
              <ShowTransactions />
            </Card>
          </Box>

          <Box sx={{ width: 400 }}>
            <Card sx={{ p: 2 }}>
              <PreviousMonthData />
            </Card>
            <Card sx={{ p: 2, mt: 2 }}>
              <ChartAnalysis />
            </Card>
          </Box>
        </Box>
      </Box>
    </TransactionProvider>
  );
}

export default App;
