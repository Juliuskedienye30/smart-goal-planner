import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import EditGoalForm from './EditGoalForm';

function GoalList({ goals, onDeleteGoal, onUpdateGoal }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div>
      <h3>All Goals</h3>
      {goals.map((goal) => (
        <div key={goal.id} className="goal-card">
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
                Target: ${goal.targetAmount} <br />
                Saved: ${goal.savedAmount} <br />
                Deadline: {goal.deadline}
              </p>
              <ProgressBar
                savedAmount={goal.savedAmount}
                targetAmount={goal.targetAmount}
              />
              <button onClick={() => setEditingId(goal.id)}>Edit</button>
              <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default GoalList;
