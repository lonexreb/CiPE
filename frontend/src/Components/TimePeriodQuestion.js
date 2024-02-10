import React, { useState } from 'react';

const TimePeriodQuestion = ({ onNextStep }) => {
  const [timePeriod, setTimePeriod] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (timePeriod === '' || Number(timePeriod) <= 0 || !/^\d+$/.test(timePeriod)) {
      setErrorMessage('Please enter a positive number for the time period.');
    } else {
      onNextStep({ timePeriod });
      setErrorMessage('');
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    // Allow only positive numbers
    if (/^\d*$/.test(input)) {
      setTimePeriod(input);
    }
  };

  return (
    <div>
      <h2>Over what time do you want to plan this budget (in weeks)?</h2>
      <input
        type="text"
        value={timePeriod}
        onChange={handleInputChange}
        placeholder="Enter time period"
      />
      <button onClick={handleNext}>Next</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default TimePeriodQuestion;
