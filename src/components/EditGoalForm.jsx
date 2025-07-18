import React, { useState } from 'react';

function EditGoalForm({ goal, onSave, onCancel }) {
  const [name, setName] = useState(goal.name);
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount);
  const [category, setCategory] = useState(goal.category);
  const [deadline, setDeadline] = useState(goal.deadline);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...goal,
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h3>Edit Goal</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditGoalForm;
