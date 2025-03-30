import React, { useState } from "react";
import { 
    Box,  Typography, TextField, List, ListItem, 
    ListItemText, IconButton 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTransactions } from "./TransactionContext";

function ShowTransactions() {
    const { transactions, deleteTransaction, CurrentMonthTransactions } = useTransactions();
    const [searchTransaction, setSearchTransaction] = useState(""); // 🔹 Updated part

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; 
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    const filteredTransactions = CurrentMonthTransactions.filter((transaction) =>
        transaction.item.toLowerCase().includes(searchTransaction.toLowerCase())
    );

    return (
        <Box>
            <Typography variant="h6" mt={2} fontWeight="bold">
                Transactions
            </Typography>

            {/* 🔹 Updated part: onChange handler filters transactions */}
            <TextField 
                fullWidth 
                placeholder="Search here" 
                variant="outlined" 
                sx={{ mt: 1 }} 
                onChange={(e) => setSearchTransaction(e.target.value)} 
            />

            {/* Scrollable List */}
            <List sx={{
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
                    <ListItemText sx={{ flex: 2, textAlign: 'right', fontWeight: 'bold' }}>Action</ListItemText>
                </ListItem>

                {filteredTransactions.map((transaction) => (
                    <ListItem key={transaction._id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemText primary={transaction.item} sx={{ flex: 2 }} />
                        <ListItemText primary={`₹${transaction.amount}`} sx={{ flex: 2, textAlign: 'center' }} />
                        <ListItemText primary={formatDate(transaction.date)} sx={{ flex: 2, textAlign: 'center' }} />
                        <ListItemText sx={{ flex: 2, textAlign: 'right' }}>
                            <IconButton edge="end" color="black" onClick={() => deleteTransaction(transaction._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemText>
                    </ListItem>
                ))}   
            </List>
        </Box>
    );
}

export default ShowTransactions;
