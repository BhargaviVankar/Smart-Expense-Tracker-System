import React from 'react';

const ExpenseTable = ({ expenses, deleteExpens }) => {

    // Latest transaction first
    const sortedExpenses = [...expenses].reverse();

    return (
        /* Is wrapper se mobile par table scroll ho sakegi aur content squeeze nahi hoga */
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <div style={{ minWidth: '600px' }}> {/* Isse columns ek limit se zyada chhete nahi honge */}

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

                            {/* Category - Isme style fix add kiya hai */}
                            <div className="expense-category">
                                <span style={{
                                    backgroundColor: '#6f42c1',
                                    color: 'white',
                                    padding: '2px 10px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap', // Isse text line mein hi rahega
                                    display: 'inline-block'
                                }}>
                                    {expense.category}
                                </span>
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
                                            : '#c0392b',
                                    fontWeight: 'bold'
                                }}
                            >
                                ₹{expense.amount}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExpenseTable;