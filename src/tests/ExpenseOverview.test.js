import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseOverview from '../components/ExpennseOverview';
// import { useTransactions } from './TransactionContext';
import { useTransactions } from '../components/TransactionContext';

jest.mock('../components/TransactionContext', () => ({
  useTransactions: jest.fn()
}));

describe('ExpenseOverview Component', () => {
  beforeEach(() => {
    useTransactions.mockReturnValue({
      CurrentMonthTransactions: [{ amount: 500 }, { amount: 1000 }],
      SetBudget: jest.fn(),
      monthBudget: 5000
    });
  });

  test('renders Budget & Expenses title', () => {
    render(<ExpenseOverview />);
    expect(screen.getByText(/Budget & Expenses/i)).toBeInTheDocument();
  });

//   test('displays correct balance and expenses', () => {
//     render(<ExpenseOverview />);
//     expect(screen.getByText(/Balance: ₹3500/i)).toBeInTheDocument(); // 5000 - (500 + 1000)
//     expect(screen.getByText(/₹1500/i)).toBeInTheDocument(); // Total expenses
//   });

//   test('opens add transaction modal on button click', () => {
//     render(<ExpenseOverview />);
//     const addButton = screen.getByText(/ADD/i);
//     fireEvent.click(addButton);
//     expect(screen.getByRole('dialog')).toBeInTheDocument();
//   });

//   test('opens set budget modal on button click', () => {
//     render(<ExpenseOverview />);
//     const setBudgetButton = screen.getByText(/Set Budget/i);
//     fireEvent.click(setBudgetButton);
//     expect(screen.getByLabelText('Budget')).toBeInTheDocument();
//   });
});
