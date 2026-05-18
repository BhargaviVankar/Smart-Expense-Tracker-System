import React from 'react';

const ExpenseTable = ({ expenses, deleteExpens }) => {

    // Latest transaction first
    const sortedExpenses = [...expenses].reverse();

    return (
        <div>

            {/* Fixed Header */}
            <div className="expense-header">
                <div>Description</div>
                <div>Category</div>
                <div>Date & Time</div>
                <div>Amount</div>
            </div>

            {/* Scrollable Transactions */}
            <div className="expense-list">

                {sortedExpenses.map((expense, index) => (
                    <div key={index} className="expense-item">

                        <button
                            className="delete-button"
                            onClick={() => deleteExpens(expense._id)}
                        >
                            X
                        </button>

                        {/* Description */}
                        <div className="expense-description">
                            {expense.text}
                        </div>

                        {/* Category */}
                        <div className="expense-category">
                            {expense.category || "General"}
                        </div>

                        {/* Date */}
                        <div className="expense-date">
                            {new Date(expense.createdAt).toLocaleString()}
                        </div>

                        {/* Amount */}
                        <div
                            className="expense-amount"
                            style={{
                                color:
                                    expense.amount > 0
                                        ? '#27ae60'
                                        : '#c0392b'
                            }}
                        >
                            ₹{expense.amount}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default ExpenseTable;