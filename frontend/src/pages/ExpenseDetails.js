import React from 'react'

function ExpenseDetails({ incomeAmt, expenseAmt }) {
    return (
        <div className="details-card">
            <div className="balance-section balance-box">
                <h4>Total Balance</h4>
                <h1>₹{incomeAmt - expenseAmt}</h1>
            </div>

            <div className="stats-row">
                <div className="stat-item">
                    <span className="stat-label">Income</span>
                    <div className="value-box income-box">
                        ₹{incomeAmt}
                    </div>
                </div>

                <div className="stat-item">
                    <span className="stat-label">Expense</span>
                    <div className="value-box expense-box">
                        ₹{expenseAmt}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseDetails