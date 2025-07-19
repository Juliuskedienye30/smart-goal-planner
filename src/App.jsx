import React, { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import { getGoals, createGoal, updateGoal, deleteGoal } from './api';
import './output.css'; // Tailwind CSS

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
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId))
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-100 to-fuchsia-100 px-4 py-12">
      <div className="w-full max-w-5xl bg-white/60 backdrop-blur border border-pink-200 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-14 space-y-10">
        
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-700 mb-2 drop-shadow">
            Baddie Goal Planner
          </h1>
          <p className="text-md sm:text-lg text-gray-700 italic">
            Plan. Slay. Repeat. 
          </p>
        </header>

        {/* Overview Section */}
        <section className="bg-rose-100 p-6 rounded-2xl shadow-inner border border-rose-200 text-center">
          <Overview goals={goals} />
        </section>

        {/* Add Goal Form */}
        <section className="bg-pink-100 p-6 rounded-2xl shadow-inner border border-pink-200 text-center">
          <GoalForm onAdd={handleAddGoal} />
        </section>

        {/* Goals List */}
        <section className="bg-fuchsia-100 p-6 rounded-2xl shadow-inner border border-fuchsia-200 text-center">
          <GoalList
            goals={goals}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        </section>

        {/* Deposit Form */}
        <section className="bg-purple-100 p-6 rounded-2xl shadow-inner border border-purple-200 text-center">
          <DepositForm goals={goals} onUpdateGoal={handleUpdateGoal} />
        </section>
      </div>
    </div>
  );
}

export default App;
