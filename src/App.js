import './App.css';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';

import { useState } from 'react';

const FormulaParser = require('hot-formula-parser').Parser;
const parser = new FormulaParser();

function App() {
  const [display, setDisplay] = useState('0');
  const [previousOperation, setPreviousOperation] = useState(null);
  const [canUseDot, setCanUseDot] = useState(true);

  const handleClick = (key) => {
    if (key === 'AC') {
      setDisplay('0');
      setPreviousOperation(key);
      setCanUseDot(true);
      return;
    }

    if (/[A-Z]/.test(display)) return;

    if (!isNaN(key)) {
      if (display === '0') {
        setDisplay(key);
      } else {
        setDisplay(display + key);
      }
      setPreviousOperation(key);
      return;
    }

    if (key === '.') {
      if ((!isNaN(previousOperation) || previousOperation === 'AC' || previousOperation === '=') && canUseDot) {
        setDisplay(display + key);
        setPreviousOperation(key);
        setCanUseDot(false);
      }
      return;
    }

    if (key !== '=') {
      if (!isNaN(previousOperation) || previousOperation === 'AC' || previousOperation === '=') {
        setDisplay(`${display} ${key} `);
        setCanUseDot(true);
        setPreviousOperation(key);
      }
      return;
    }

    if (previousOperation === '=') return;

    const result = parser.parse(display);
    if (!result.error) {
      setPreviousOperation(key);
      setDisplay(result.result);
    } else {
      setDisplay('ERR');
    }
    return;
  }

  return (
    <div className="app">
      <div className="calculatorRow">
        <CalculatorDisplay display={display} />
        <CalculatorButton display='AC' isLong={true} highlight='theme' onClick={() => handleClick('AC')} />
      </div>
      <div className="calculatorRow">
        <CalculatorButton display='7' onClick={() => handleClick('7')} />
        <CalculatorButton display='8' onClick={() => handleClick('8')} />
        <CalculatorButton display='9' onClick={() => handleClick('9')} />
        <CalculatorButton display='/' onClick={() => handleClick('/')} highlight='dark' />
      </div>
      <div className="calculatorRow">
        <CalculatorButton display='4' onClick={() => handleClick('4')} />
        <CalculatorButton display='5' onClick={() => handleClick('5')} />
        <CalculatorButton display='6' onClick={() => handleClick('6')} />
        <CalculatorButton display='x' onClick={() => handleClick('*')} highlight='dark' />
      </div>
      <div className="calculatorRow">
        <CalculatorButton display='1' onClick={() => handleClick('1')} />
        <CalculatorButton display='2' onClick={() => handleClick('2')} />
        <CalculatorButton display='3' onClick={() => handleClick('3')} />
        <CalculatorButton display='-' onClick={() => handleClick('-')} highlight='dark' />
      </div>
      <div className="calculatorRow">
        <CalculatorButton display='0' onClick={() => handleClick('0')} />
        <CalculatorButton display='.' onClick={() => handleClick('.')} />
        <CalculatorButton display='=' onClick={() => handleClick('=')} highlight='theme' />
        <CalculatorButton display='+' onClick={() => handleClick('+')} highlight='dark' />
      </div>
    </div>
  );
}

export default App;
