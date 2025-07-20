import React, { useState } from 'react';
import { createGoal } from '../api'; // ✅ import API function

function GoalForm({ onAddGoal }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString().split('T')[0]
    };

    createGoal(newGoal)
      .then(data => {
        onAddGoal(data);
        setName('');
        setTargetAmount('');
        setCategory('');
        setDeadline('');
      })
      .catch(err => console.error('Error creating goal:', err));
  };

  return (
    <div className="card">
      <h3>Add New Goal</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Target amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />

        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;
