import React, { useState } from 'react';

import rootStore from '@store/RootStore';
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
    // rootStore.query.setSearch(val);
  };
  return (
    <input
      type="text"
      placeholder={val}
      className={inputClassName}
      onChange={handleChange}
      disabled={disabled}
      {...rest}
    />
  );
};

export default Input;
