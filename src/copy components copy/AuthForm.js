import React, { useState } from "react";
import { useTransactions } from "./TransactionContext";
import { TextField, Button, Typography, Card, CardContent, Grid, Box, Alert } from "@mui/material";

const AuthForm = ({ setIsAuthenticated }) => {
  const { registerUser, loginUser, errorMessage } = useTransactions();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser(formData.name, formData.email, formData.password);
      } else {
        const success = await loginUser(formData.email, formData.password);
      if (success) {  // ✅ Only set isAuthenticated if login was successful
        setIsAuthenticated(true);
      }
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={11} sm={8} md={5} lg={4}>
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom sx={{ color: "#36687d", fontWeight: 700 }}>
              {isRegister ? "REGISTER" : "LOGIN"}
            </Typography>

            {errorMessage && (
              <Box sx={{ marginBottom: 5 }}>
                <Alert severity="error">{errorMessage}</Alert>
              </Box>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {isRegister && (
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              )}
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Button
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  background: "#36687d",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(to right, #1b303b, #26414f, #35566c)",
                  },
                }}
              >
                {isRegister ? "Register" : "Login"}
              </Button>
            </Box>

            <Button fullWidth sx={{ marginTop: 2, color: "#36687d", fontWeight: 700 }} onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Login" : "Register"}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
