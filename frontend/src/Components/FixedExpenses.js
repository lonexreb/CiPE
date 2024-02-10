import React, { useState } from 'react';

const FixedExpenses = ({ onAddExpense }) => {
  const [expenses, setExpenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddExpense = () => {
    const newExpense = { category: '', amount: '' };
    setExpenses([...expenses, newExpense]);
    setErrorMessage('');
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExpenses = [...expenses];
    updatedExpenses[index][name] = value;
    setExpenses(updatedExpenses);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleSubmit = () => {
    const hasInvalidExpenses = expenses.some(expense => {
      return (expense.category === '' && expense.amount !== '') || (expense.category !== '' && expense.amount === '');
    });

    if (!hasInvalidExpenses || expenses.length === 0) {
      const validExpenses = expenses.filter(expense => expense.category !== '' || expense.amount !== '');
      onAddExpense(validExpenses);
      setExpenses([]);
      setErrorMessage('');
    } else {
      setErrorMessage('Please fill in both category and amount fields correctly for entered expenses.');
    }
  };

  return (
    <div>
      <h2>Enter any Fixed Expenses you plan to have during this period:</h2>
      {expenses.map((expense, index) => (
        <div key={index}>
          <input
            type="text"
            name="category"
            value={expense.category}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Enter category"
          />
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Enter amount"
          />
          <button onClick={() => handleDeleteExpense(index)}>Delete</button>
        </div>
      ))}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleAddExpense}>+ Add Expense</button>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default FixedExpenses;