// Updated GoalList.jsx
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import EditGoalForm from './EditGoalForm';

function GoalList({ goals, onDeleteGoal, onUpdateGoal }) {
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredGoals = goals.filter((goal) => {
    const isCompleted = goal.savedAmount >= goal.targetAmount;
    const isOverdue = new Date(goal.deadline) < new Date() && !isCompleted;

    if (filter === "completed") return isCompleted;
    if (filter === "overdue") return isOverdue;
    return true;
  });

  const sortedGoals = [...filteredGoals].sort((a, b) => {
    if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
    if (sortBy === "progress") {
      const progressA = a.savedAmount / a.targetAmount;
      const progressB = b.savedAmount / b.targetAmount;
      return progressB - progressA;
    }
    return 0;
  });

  return (
    <div className="card">
      <h3>All Goals</h3>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("overdue")}>Overdue</button>

        <select onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px', borderRadius: '8px' }}>
          <option value="default">Sort by</option>
          <option value="deadline">Deadline</option>
          <option value="progress">Progress</option>
        </select>
      </div>

      {sortedGoals.length === 0 && <p style={{ color: '#ccc' }}>No goals to show.</p>}

      {sortedGoals.map((goal) => {
        const isCompleted = goal.savedAmount >= goal.targetAmount;
        const isOverdue = new Date(goal.deadline) < new Date() && !isCompleted;
        const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const isWarning = daysLeft >= 0 && daysLeft <= 30 && !isCompleted;

        return (
          <div key={goal.id} className="card">
            {editingId === goal.id ? (
              <EditGoalForm
                goal={goal}
                onSave={(updated) => {
                  onUpdateGoal(updated);
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <h4>{goal.name}</h4>
                <p>
                  Category: {goal.category} <br />
                  Target: {goal.targetAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} <br />
                  Saved: {goal.savedAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} <br />
                  Deadline: {goal.deadline}
                </p>

                {isOverdue && <p className="overdue">Overdue!</p>}
                {isWarning && <p className="warning">Deadline in {daysLeft} days!</p>}

                <ProgressBar
                  savedAmount={goal.savedAmount}
                  targetAmount={goal.targetAmount}
                />
                <button onClick={() => setEditingId(goal.id)}>Edit</button>
                <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;