import React from 'react';

function ExpenseDetails({ incomeAmt, expenseAmt }) {
    const totalBalance = incomeAmt - expenseAmt;

    return (
        <div className="details-card">
            {/* Total Balance Section */}
            <div className="balance-section">
                <p className="balance-label">Total Balance</p>
                <h1 className="balance-amount">₹{totalBalance.toLocaleString()}</h1>
            </div>
            
            {/* Income and Expense Side-by-Side Row */}
            <div className="stats-row">
                
                {/* Income Section */}
                <div className="stat-item">
                    <span className="stat-title">Income</span>
                    <div className="value-box income">
                        ₹{incomeAmt.toLocaleString()}
                    </div>
                </div>

                {/* Expense Section */}
                <div className="stat-item">
                    <span className="stat-title">Expense</span>
                    <div className="value-box expense">
                        ₹{expenseAmt.toLocaleString()}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ExpenseDetails;