import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleEqual = () => {
    if (input === '') {
      setResult('Error');
      return;
    }

    try {
      const evaluatedResult = evaluateExpression(input);
      setResult(evaluatedResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const evaluateExpression = (expression) => {
    // Check for incomplete expression
    if (/[\+\-\*\/]$/.test(expression)) {
      throw new Error('Incomplete expression');
    }

    try {
      // Use a safe evaluation method
      const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
      const evaluatedResult = new Function('return ' + sanitizedExpression)();
      
      if (evaluatedResult === Infinity) return 'Infinity';
      if (isNaN(evaluatedResult)) return 'NaN';
      
      return evaluatedResult.toString();
    } catch (e) {
      return 'Error';
    }
  };

  return (
    <div className="calculator">
        <h1>React Calculator</h1>
      <input type="text" className="calculator-input" value={input} readOnly />
      <div className="result">{result}</div>
      <div className="calculator-buttons">
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleEqual}>=</button>
        <button onClick={() => handleClick('/')}>/</button>
      </div>
    </div>
  );
};

export default Calculator;
