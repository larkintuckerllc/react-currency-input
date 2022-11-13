import React, { CSSProperties, FC, KeyboardEvent, useCallback } from 'react';

interface Props {
  className?: string;
  id?: string;
  max?: number;
  cents?: boolean;
  includeSign?: boolean;
  onValueChange: (value: number) => void;
  style?: CSSProperties;
  value: number;
}

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

const CurrencyInput: FC<Props> = ({
  className = undefined,
  id = undefined,
  max = Number.MAX_SAFE_INTEGER / 100,
  cents = true,
  includeSign = true,
  onValueChange,
  style = {},
  value,
}) => {
  max = cents ? max * 100 : max;
  value = cents ? Math.trunc(value * 100) : value;
  const valueAbsTrunc = Math.trunc(Math.abs(value));
  if (value !== valueAbsTrunc || !Number.isFinite(value) || Number.isNaN(value)) {
    throw new Error(`invalid value property`);
  }
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      const { key, keyCode } = e;
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
      ) {
        return;
      }
      const valueString = value.toString();
      let nextValue: number;
      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString: string = value === 0 ? key : `${valueString}${key}`;
        nextValue = Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString = valueString.slice(0, -1);
        nextValue = nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10);
      }
      if (nextValue > max) {
        return;
      }
      onValueChange(cents ? nextValue / 100 : nextValue);
    },
    [max, onValueChange, value]
  );
  const handleChange = useCallback(() => {
    // DUMMY TO AVOID REACT WARNING
  }, []);

  let valueDisplay = (cents ? value / 100 : value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // trim the dollar sign off if unwanted
  valueDisplay = includeSign ? valueDisplay : valueDisplay.slice(1);

  return (
    <input
      className={className}
      id={id}
      inputMode="numeric"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      style={style}
      value={valueDisplay}
    />
  );
};

export default CurrencyInput;