import React, { useState } from 'react';

const SavingsGoalQuestion = ({ onNextStep, salaryValue }) => {
  const [savings, setSavings] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (savings < 0 || savings === '') {
      setErrorMessage('Please enter a non-negative number for savings goal');
    } else if (parseFloat(savings) > parseFloat(salaryValue)) {
      setErrorMessage('Savings goal should be less than or equal to your total salary');
    } else {
      onNextStep({ savings });
      setErrorMessage('');
    }
  };

  return (
    <div>
      <h2>What is your savings goal?</h2>
      <input
        type="number"
        value={savings}
        onChange={(e) => setSavings(e.target.value)}
        placeholder="Enter savings goal"
      />
      <button onClick={handleNext}>Next</button>
      {errorMessage && <p style={{ color: 'red', marginTop: '8px' }}>{errorMessage}</p>}
    </div>
  );
};

export default SavingsGoalQuestion;
