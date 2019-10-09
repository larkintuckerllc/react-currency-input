import React, { FC, useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyInput from './components/CurrencyInput';

const App: FC = () => {
  const [value, setValue] = useState(0);
  const handleValueChange = useCallback(val => {
    // eslint-disable-next-line
    console.log(val);
    setValue(val);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit&nbsp;
          <code>src/App.tsx</code>
          &nbsp;and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CurrencyInput
          max={100000000}
          onValueChange={handleValueChange}
          style={{ textAlign: 'right' }}
          value={value}
        />
      </header>
    </div>
  );
};

export default App;
