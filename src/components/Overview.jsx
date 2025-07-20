import React from 'react';

function Overview({ goals }) {
  if (!goals || goals.length === 0) {
    return (
      <div className="card">
        <h3>Overview</h3>
        <p>No goals yet. Add one to get started!</p>
      </div>
    );
  }

  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;
  const overdueGoals = goals.filter(g => new Date(g.deadline) < new Date() && g.savedAmount < g.targetAmount).length;

  return (
    <div className="card">
      <h3>Overview</h3>
      <p><strong>Total Goals:</strong> {goals.length}</p>
      <p><strong>Completed Goals:</strong> {completedGoals}</p>
      <p><strong>Overdue Goals:</strong> {overdueGoals}</p>
      <p><strong>Total Saved:</strong> ${totalSaved.toLocaleString()}</p>
      <p><strong>Total Target:</strong> ${totalTarget.toLocaleString()}</p>
    </div>
  );
}

export default Overview;
