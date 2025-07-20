import React, { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import { getGoals, createGoal, updateGoal, deleteGoal } from './api';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getGoals().then(setGoals);
  }, []);

  const handleAddGoal = (newGoal) => {
    createGoal(newGoal).then((savedGoal) =>
      setGoals((prevGoals) => [...prevGoals, savedGoal])
    );
  };

  const handleUpdateGoal = (updatedGoal) => {
    updateGoal(updatedGoal.id, updatedGoal).then((savedGoal) =>
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === savedGoal.id ? savedGoal : goal
        )
      )
    );
  };

  const handleDeleteGoal = (goalId) => {
    deleteGoal(goalId).then(() =>
      setGoals((prevGoals) =>
        prevGoals.filter((goal) => goal.id !== goalId)
      )
    );
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>Smart Goal Planner</h1>
        <p>Plan your goals. Track your progress. Achieve more.</p>
      </header>

      <div className="overview-section card">
        <Overview goals={goals} />
      </div>

      <div className="main-grid grid-columns">
        <div className="left-column">
          <div className="card">
            <GoalForm onAddGoal={handleAddGoal} />
          </div>
          <div className="card">
            <DepositForm goals={goals} onDeposit={handleUpdateGoal} />

          </div>
        </div>

        <div className="right-column">
          <div className="card">
            <GoalList
              goals={goals}
              onUpdateGoal={handleUpdateGoal}
              onDeleteGoal={handleDeleteGoal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
