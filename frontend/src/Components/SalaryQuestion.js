import React, { Component } from 'react';

class SalaryQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: '',
      errorMessage: ''
    };
  }

  handleNext = () => {
    const { salary } = this.state;

    if (salary <= 0 || salary === '') {
      this.setState({ errorMessage: 'Please enter a valid positive number' });
    } else {
      this.setState({ errorMessage: '' });
      this.props.onNextStep({ salary });
    }
  };

  render() {
    const { salary, errorMessage } = this.state;

    return (
      <div>
        <h2>What is your total salary?</h2>
        <input
          type="number"
          value={salary}
          onChange={(e) => this.setState({ salary: e.target.value })}
          placeholder="Enter total salary"
        />
        <button onClick={this.handleNext}>Next</button>
        {errorMessage && <p style={{ color: 'red', marginTop: '8px' }}>{errorMessage}</p>}
      </div>
    );
  }
}

export default SalaryQuestion;
