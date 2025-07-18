import React, { useState } from 'react';

function DepositForm({ goals, onUpdateGoal }) {
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [amount, setAmount] = useState('');

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!selectedGoalId || !amount) {
      alert("Select a goal and enter an amount");
      return;
    }

    const goalToUpdate = goals.find(
      (g) => g.id === Number(selectedGoalId) // Fix: convert to number
    );

    if (!goalToUpdate) {
      alert("Goal not found");
      return;
    }

    const updatedGoal = {
      ...goalToUpdate,
      savedAmount: goalToUpdate.savedAmount + parseFloat(amount),
    };

    onUpdateGoal(updatedGoal);

    setAmount('');
    setSelectedGoalId('');
  };

  return (
    <form onSubmit={handleDeposit}>
      <h3>Deposit to a Goal</h3>

      <select
        value={selectedGoalId}
        onChange={(e) => setSelectedGoalId(e.target.value)}
        required
      >
        <option value="">-- Select a Goal --</option>
        {goals.length === 0 ? (
          <option disabled>No goals available</option>
        ) : (
          goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))
        )}
      </select>

      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
