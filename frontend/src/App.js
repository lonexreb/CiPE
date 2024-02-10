import React, { useState } from 'react';
import SalaryQuestion from './Components/SalaryQuestion';
import SavingsGoalQuestion from './Components/SavingsGoalQuestion';
import TimePeriodQuestion from './Components/TimePeriodQuestion';
import FixedExpenses from './Components/FixedExpenses';
import UserDescription from './Components/UserDescription';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import SavedPlans from './Components/SavedPlans';


const DisplayUserData = ({ userData, expenses, description, result, genImage}) => {
  const isResultAvailable  = Object.keys(result).length > 0; 

  const renderFormattedResult = () => {
    const formattedResult = result.replace(/(?:\r\n|\r|\n)/g, '<br>'); 
    return { __html: formattedResult };
  };

  const displayResult = isResultAvailable ? (
    <div dangerouslySetInnerHTML={renderFormattedResult()} />
  ) : (
    'N/A'
  );

  return (
    <div className="userDataDisplay">
      <h2>User Data Display</h2>
      <div>
        <strong>Total Salary:</strong> {userData.salary || 'N/A'}
      </div>
      <div>
        <strong>Savings Goal:</strong> {userData.savings || 'N/A'}
      </div>
      <div>
        <strong>Time Period:</strong> {userData.timePeriod || 'N/A'}
      </div>
      <div>
        <strong>Fixed Expenses:</strong>
        {expenses.length > 0 ? (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                {expense.category}: {expense.amount}
              </li>
            ))}
          </ul>
        ) : (
          'N/A'
        )}
      </div>
      <div>
        <strong>Description:</strong> {userData.description || 'N/A'}
      </div>
      <div>
        <h3>Budget Analysis</h3>
        <div>{displayResult}</div>
      </div>
      <div>
        <h3>Images</h3>
        <div>
          {genImage ? (
            <img src={genImage} alt={`Generated Image`} />
          ) : (
            <span>No image generated</span>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [resultData, setResultData] = useState('');
  const [imageData, setImageData] = useState('');
  const location = useLocation();

  const handleNextStep = (data) => {
    setUserData({ ...userData, ...data });

    switch (step) {
      case 0:
        setSalary(data.salary);
        break;
      case 1:
        setSavingsGoal(data.savings);
        break;
      case 2:
        setTimePeriod(data.timePeriod);
        break;
      case 3:
        setExpenses(data);
        break;
      case 4:
        setDescription(data.description || 'N/A');
        break; 
      default:
        break;
    }

    setStep(step + 1);
  };

  const handleDescriptionSubmit = ({ description }) => {
    handleNextStep({ description });
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {

    if (step === 4) {
      handleNextStep({ description });
    }

    setResultData('');

    const userDataForAPI = {
      salary: salary,
      savingsGoal: savingsGoal,
      timePeriod: timePeriod,
      expenses: expenses,
      description: description,
    };

    fetch('http://localhost:3001/openai', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataForAPI),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
        
      })
      .then(data => {

        const resultText = data.result.replace(/\n/g, '<br>'); 
        setResultData(resultText); 
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation for text:', error);
      });


    fetch('http://localhost:3001/openai/image', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDataForAPI),
    })
    .then(response => {

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
    })
    .then(data => {

    if (data && data.image_url) {
      setImageData(data.image_url); 
    } else {
      setImageData('N/A'); 
    }

    console.log(data.image_url);


    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });

  };

  const saveUserData = async () => {
    try {
      const response = await fetch('http://localhost:3001/putData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          expenses,
          description,
          resultData,
          imageData,
        }),
      });
      if (response.ok) {
        console.log('User data saved successfully!');
      } else {
        console.error('Failed to save user data');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };


  const renderStep = () => {
    switch (step) {
      case 0:
        return <SalaryQuestion onNextStep={handleNextStep} />;
      case 1:
        return <SavingsGoalQuestion onNextStep={handleNextStep} salaryValue={salary} />;
      case 2:
        return <TimePeriodQuestion onNextStep={handleNextStep} />;
      case 3:
        return <FixedExpenses onAddExpense={handleNextStep} />;
      case 4:
        return (
          <UserDescription
            onSubmitDescription={handleDescriptionSubmit}
            onSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };
  
  const NotFound = () => {
    return <div>Page Not Found</div>;
  };

  return (
    <div className="App">
      <h1>Budget Tracker</h1>
      {location.pathname === '/' && (
        <div className="topRightButton">
          <Link to="/saved-plans">View Saved Plans</Link>
          <button onClick={saveUserData}>Save Current Plan</button>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div className="stepsContainer">
              <div className="questionContainer">
                {renderStep()}
                {step > 0 && <button onClick={handlePreviousStep}>Go Back</button>}
                {step === 5 && <button onClick={handleSubmit}>Submit</button>}
              </div>
              <DisplayUserData
                userData={userData}
                expenses={expenses}
                description={description}
                result={resultData}
                genImage={imageData}
              />
            </div>
          }
        />
        <Route path="/saved-plans" element={<SavedPlans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );

};

export default App;
