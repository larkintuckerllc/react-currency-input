import React, { FC, KeyboardEvent, useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

const App: FC = () => {
  const [value, setValue] = useState(0);
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>): void => {
    const { key, keyCode } = e;
    setValue(previousValue => {
      if (
        (previousValue === 0 && !VALID_FIRST.test(key)) ||
        (previousValue !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
      ) {
        return previousValue;
      }
      const previousValueString = previousValue.toString();
      let nextValue: number;
      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString: string = previousValue === 0 ? key : `${previousValueString}${key}`;
        nextValue = Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString = previousValueString.slice(0, -1);
        nextValue = nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10);
      }
      return nextValue;
    });
  }, []);
  const valueDisplay = value / 100;

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
        <input
          onKeyDown={handleKeyDown}
          pattern="/d*"
          type="text"
          value={valueDisplay.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        />
        <input />
        <input />
      </header>
    </div>
  );
};

export default App;
