// UserDescription.js
import React, { useState } from 'react';

const UserDescription = ({ onSubmitDescription }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmitDescription({ description });
  };

  return (
    <div>
      <h2>For better results, please describe yourself</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description"
      />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default UserDescription;
