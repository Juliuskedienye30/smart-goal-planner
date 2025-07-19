import React from 'react';

// Helper to get days left
function getDaysLeft(deadline) {
  const today = new Date();
  const due = new Date(deadline);
  const diff = due - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

  const completedGoals = goals.filter(
    (g) => g.savedAmount >= g.targetAmount
  ).length;

  return (
    <div className="overview">
      <h3>Overview</h3>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Goals Completed: {completedGoals}</p>

      {goals.map((goal) => {
        const daysLeft = getDaysLeft(goal.deadline);
        const isCompleted = goal.savedAmount >= goal.targetAmount;
        const isOverdue = daysLeft < 0 && !isCompleted;
        const isWarning = daysLeft >= 0 && daysLeft <= 30 && !isCompleted;

        return (
          <div key={goal.id}>
            <strong>{goal.name}</strong>:
            {isOverdue && (
              <span style={{ color: 'red' }}> Overdue!</span>
            )}
            {isWarning && (
              <span style={{ color: 'orange' }}>
                {' '}
                Deadline in {daysLeft} days!
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Overview;
