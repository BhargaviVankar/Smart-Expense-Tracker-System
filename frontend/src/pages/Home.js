import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';

function Home() {
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const navigate = useNavigate();

    // Income & Expense calculation
    useEffect(() => {
        const amounts = expenses.map(item => item.amount);

        const income = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => acc + item, 0);

        const exp = amounts
            .filter(item => item < 0)
            .reduce((acc, item) => acc + item, 0) * -1;

        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses]);

    // Fetch expenses
    const fetchExpenses = useCallback(async () => {
        try {
            const url = `${APIUrl}/expenses`;

            const headers = {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            };

            const response = await fetch(url, headers);

            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            const result = await response.json();
            setExpenses(result.data);

        } catch (err) {
            handleError(err);
        }
    }, [navigate]);

    // Load expenses on component mount
    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    // Add transaction
    const addTransaction = async (data) => {
        try {
            let finalAmount = Number(data.amount);

            if (data.type === 'expense') {
                finalAmount = -Math.abs(finalAmount);
            } else {
                finalAmount = Math.abs(finalAmount);
            }

            const payload = {
                text: data.text,
                amount: finalAmount
            };

            const url = `${APIUrl}/expenses`;

            const headers = {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            };

            const response = await fetch(url, headers);

            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            const result = await response.json();

            handleSuccess(result?.message);
            setExpenses(result.data);

        } catch (err) {
            handleError(err);
        }
    };

    // Delete expense
    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;

            const headers = {
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                method: 'DELETE'
            };

            const response = await fetch(url, headers);
            const result = await response.json();

            handleSuccess(result?.message);
            setExpenses(result.data);

        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="home-container">

            {/* Left Section */}
            <div className="home-left">
                <div className="card-container">
                    <ExpenseForm addTransaction={addTransaction} />
                </div>
            </div>

            {/* Right Section */}
            <div className="home-right">

                <ExpenseDetails
                    incomeAmt={incomeAmt}
                    expenseAmt={expenseAmt}
                />

                <div className="table-wrapper">
                    <h3>Transaction History</h3>

                    <ExpenseTable
                        expenses={expenses}
                        deleteExpens={deleteExpens}
                    />
                </div>

            </div>

            <ToastContainer />

        </div>
    );
}

export default Home;