import React, { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import { getGoals, createGoal, updateGoal, deleteGoal } from './api';

function App() {
  // State to hold all goals from your db.json
  const [goals, setGoals] = useState([]);

  // Load goals when the app starts
  useEffect(() => {
    getGoals().then(data => setGoals(data));
  }, []);

  // Add a new goal
  const handleAddGoal = (newGoal) => {
    createGoal(newGoal).then((savedGoal) => {
      setGoals([...goals, savedGoal]);
    });
  };

  // Update an existing goal
  const handleUpdateGoal = (updatedGoal) => {
    updateGoal(updatedGoal.id, updatedGoal).then((savedGoal) => {
      setGoals(goals.map(goal => goal.id === savedGoal.id ? savedGoal : goal));
    });
  };

  // Delete a goal
  const handleDeleteGoal = (goalId) => {
    deleteGoal(goalId).then(() => {
      setGoals(goals.filter(goal => goal.id !== goalId));
    });
  };

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>

      {/* Overview stats */}
      <Overview goals={goals} />

      {/* Add new goal form */}
      <GoalForm onAdd={handleAddGoal} />

      {/* List of all goals with delete/edit */}
      <GoalList
        goals={goals}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />

      {/* Deposit money into a goal */}
      <DepositForm goals={goals} onUpdateGoal={handleUpdateGoal} />
    </div>
  );
}

export default App;
