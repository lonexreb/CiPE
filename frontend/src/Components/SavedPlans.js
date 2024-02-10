import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SavedPlans = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleGoBack = () => {
    navigate(-1); 
  };

  const fetchData = () => {
    fetch('http://localhost:3001/getData') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.data); 
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/deleteData/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        fetchData();
      })
      .catch(error => {
        console.error('There was a problem deleting the data:', error);
      });
  };

  return (
    <div>
      <h2>Saved Plans</h2>
      <button onClick={handleGoBack}>Go Back</button>
  
      <div>
        {data.map((item, index) => (
        <div key={index} style={{ marginBottom: '40px', border: '10px solid #ccc', padding: '10px' }}>
        <button onClick={() => handleDelete(item._id)}>Delete</button>
        <h3>User Data</h3>
            <p>
              Salary: {item.userData.salary}
            </p>
            <p>
              Savings: {item.userData.savings}
            </p>
            <p>
              Time Period: {item.userData.timePeriod}
            </p>
            <p>
              Description: {item.userData.description}
            </p>
  
            <h3>Expenses</h3>
            {item.expenses.map((expense, i) => (
              <div key={i}>
                <p>
                  Category: {expense.category}, Amount: {expense.amount}
                </p>
              </div>
            ))}
  
            <h3>Analysis Result</h3>
            <p dangerouslySetInnerHTML={{ __html: item.resultData }}></p>
  
            <h3>Image</h3>
            <img src={item.imageData} alt="Generated Image" />
  
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPlans;
