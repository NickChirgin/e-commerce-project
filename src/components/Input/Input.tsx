import React, { useEffect, useState } from 'react';

import cn from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  value: string;
  onChange?: (value: string) => void;
};

export type Ob = {
  [key: string]: string;
};

const Input: React.FC<InputProps> = ({
  value,
  className,
  onChange,
  disabled,
  ...rest
}) => {
  const [val, setVal] = useState(value);
  const inputClassName = cn(className, disabled ? 'input_disabled' : '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  useEffect(() => setVal(value), [value]);
  return !disabled ? (
    <input
      type="text"
      value={val}
      className={inputClassName}
      {...rest}
      onChange={handleChange}
    />
  ) : (
    <input
      type="text"
      value={val}
      className={inputClassName}
      {...rest}
      disabled
    />
  );
};

export default Input;
