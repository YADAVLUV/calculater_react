import React, { Component } from 'react';
import './App.css'; // You can create a separate CSS file for styling

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: '0', // The current input/display value
      prevValue: '', // Previous value before an operator is selected
      operator: '', // The operator (+, -, *, /)
      waitingForOperand: false, // Flag to track if we're waiting for the next operand
    };
  }

  handleDigitClick = (digit) => {
    const { display, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        display: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        display: display === '0' ? String(digit) : display + digit,
      });
    }
  };

  handleOperatorClick = (operator) => {
    const { display, operator: prevOperator } = this.state;

    if (prevOperator && this.state.waitingForOperand) {
      this.setState({
        operator,
      });
      return;
    }

    if (prevOperator) {
      const result = this.calculate();
      this.setState({
        display: String(result),
        prevValue: result,
      });
    } else {
      this.setState({
        prevValue: display,
      });
    }

    this.setState({
      operator,
      waitingForOperand: true,
    });
  };

  handleEqualsClick = () => {
    if (this.state.prevValue && this.state.operator && !this.state.waitingForOperand) {
      const result = this.calculate();
      this.setState({
        display: String(result),
        prevValue: result,
        operator: '',
        waitingForOperand: true,
      });
    }
  };

  handleClearClick = () => {
    this.setState({
      display: '0',
      prevValue: '',
      operator: '',
      waitingForOperand: false,
    });
  };

  calculate = () => {
    const { prevValue, operator, display } = this.state;
    const prev = parseFloat(prevValue);
    const current = parseFloat(display);

    switch (operator) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        if (current === 0) {
          alert('Cannot divide by zero.');
          return '0';
        }
        return prev / current;
      default:
        return current;
    }
  };

  render() {
    return (
      <div className="calculator">
        <div className="display">{this.state.display}</div>
        <div className="buttons">
          <button onClick={() => this.handleClearClick()}>C</button>
          <button onClick={() => this.handleDigitClick(7)}>7</button>
          <button onClick={() => this.handleDigitClick(8)}>8</button>
          <button onClick={() => this.handleDigitClick(9)}>9</button>
          <button onClick={() => this.handleOperatorClick('+')}>+</button>
          <button onClick={() => this.handleDigitClick(4)}>4</button>
          <button onClick={() => this.handleDigitClick(5)}>5</button>
          <button onClick={() => this.handleDigitClick(6)}>6</button>
          <button onClick={() => this.handleOperatorClick('-')}>-</button>
          <button onClick={() => this.handleDigitClick(1)}>1</button>
          <button onClick={() => this.handleDigitClick(2)}>2</button>
          <button onClick={() => this.handleDigitClick(3)}>3</button>
          <button onClick={() => this.handleOperatorClick('*')}>*</button>
          <button onClick={() => this.handleDigitClick(0)}>0</button>
          <button onClick={() => this.handleEqualsClick()}>=</button>
          <button onClick={() => this.handleOperatorClick('/')}>/</button>
        </div>
      </div>
    );
  }
}

export default App;
