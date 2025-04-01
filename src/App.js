import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import ExpennseOverview from "./components/ExpennseOverview";
import ShowTransactions from "./components/ShowTransactions";
import PreviousMonthData from "./components/PreviousMonthData";
import ChartAnalysis from "./components/ChartAnalysis";
import SavingsComparison from "./components/SavingsComparison";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Card, Typography, Button, Menu, MenuItem, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { useTransactions } from "./components/TransactionContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const { logoutUser } = useTransactions();
  
  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Handle Logout
  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    handleMenuClose();
  };

  // Open and Close Menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Breakpoints for mobile/tablet
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        width: "100%",
        minHeight: "100vh",
        paddingBottom: isMobile ? "20px" : "0", // Adjust padding for mobile
        position: "relative",
      }}
    >
      {isAuthenticated ? (
        <>
          {/* Header Section */}
          <Box
            sx={{
              height: isMobile ? 60 : 80, // Smaller header height on mobile
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "10px 15px" : "20px",
              boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Left: Expense Tracker */}
            <Typography variant={isMobile ? "h6" : "h4"} fontWeight="bold" color="white">
              Expense Tracker
            </Typography>

            {/* Right: Menu for mobile, User Name + Logout Button for desktop */}
            {isMobile ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ color: "white" }}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    <Typography variant="body1" color="primary">
                      {`Welcome, ${localStorage.getItem("user")}`}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LogoutIcon sx={{ marginRight: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h5" color="white" noWrap>
                  {`Welcome, ${localStorage.getItem("user")}`}
                </Typography>
                <Button
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    color: "#fff",
                    background: "#36687d",
                    "&:hover": {
                      background: "linear-gradient(to right, #1b303b, #26414f, #35566c)",
                    },
                  }}
                  variant="contained"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Box>

          {/* Content Section */}
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: isMobile ? 2 : 5,
              position: "relative",
            }}
          >
            {/* Savings Comparison */}
            <Box >
              <SavingsComparison />
            </Box>

            {/* Main Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row", // Stack on mobile
                justifyContent: "center",
                gap: 2,
                textAlign: "center",
                width: "100%",
                mt: 4,
              }}
            >
              {/* Left Section: Expennse Overview + Show Transactions */}
              <Box
                sx={{
                  width: isMobile ? "100%" : "700px",
                  mb: isMobile ? 3 : 0,
                }}
              >
                <Card sx={{ p: 2 }}>
                  <ExpennseOverview />
                  <ShowTransactions />
                </Card>
              </Box>

              {/* Right Section: Previous Month Data + Chart Analysis */}
              <Box
                sx={{
                  width: isMobile ? "100%" : "400px",
                  mb: isMobile ? 3 : 0,
                }}
              >
                <Card sx={{ p: 2 }}>
                  <PreviousMonthData />
                </Card>
                <Card sx={{ p: 2, mt: 2 }}>
                  <ChartAnalysis />
                </Card>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <AuthForm setIsAuthenticated={setIsAuthenticated} />
      )}
    </Box>
  );
}

export default App;
