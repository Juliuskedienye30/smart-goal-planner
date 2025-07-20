import React, { useState } from 'react';

function DepositForm({ goals, onDeposit }) {
  const [goalId, setGoalId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedGoal = goals.find(goal => goal.id === goalId);
    if (!selectedGoal) {
      setMessage({ type: 'error', text: 'No goal found!' });
      return;
    }

    const newAmount = selectedGoal.savedAmount + parseFloat(amount);

    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ savedAmount: newAmount })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to deposit');
        return res.json();
      })
      .then(updatedGoal => {
        onDeposit(updatedGoal);
        setMessage({ type: 'success', text: 'Deposit successful!' });
        setGoalId('');
        setAmount('');
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Something went wrong.' });
      });
  };

  return (
    <div className="card">
      <h3>Make a Deposit</h3>
      <form onSubmit={handleSubmit}>
        <select value={goalId} onChange={(e) => setGoalId(e.target.value)} required>
          <option value="">Select a goal</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">Deposit</button>
      </form>

      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'lightgreen', marginTop: '10px' }}>
          {message.text}
        </p>
      )}
    </div>
  );
}

export default DepositForm;
