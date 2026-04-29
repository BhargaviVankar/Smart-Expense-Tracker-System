import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseForm({ addTransaction }) {
    const [formData, setFormData] = useState({
        text: '',
        amount: '',
        type: 'income' // Default 'income' rakha hai
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { text, amount, type } = formData;
        if (!text || !amount) {
            handleError('Please add text and amount');
            return;
        }
        // Hum poora data (text, amount, aur type) bhej rahe hain
        addTransaction(formData);
        setFormData({ text: '', amount: '', type: 'income' });
    };

    return (
        <div className="container">
            <h3>Add New Transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Description</label>
                    <input
                        type="text"
                        name="text"
                        onChange={handleChange}
                        placeholder="Enter text..."
                        value={formData.text}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        onChange={handleChange}
                        placeholder="Enter amount..."
                        value={formData.amount}
                    />
                </div>
                <div className="form-control">
                    <label>Transaction Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="income">Income (+)</option>
                        <option value="expense">Expense (-)</option>
                    </select>
                </div>
                <button className="btn">Add Transaction</button>
            </form>
        </div>
    );
}

export default ExpenseForm;