import React from 'react';
import { useState } from 'react';

import cn from 'classnames';

import mdStyles from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: string[];
  value: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  text: string;
  // pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  text,
  // pluralizeOptions,
  ...rest
}) => {
  const [isShown, setIsShown] = useState(false);
  let cnButton = cn(mdStyles.button, disabled ? mdStyles.button__disabled : '');
  const clickHandler = () => setIsShown((prev) => !prev);
  const changer = (option: string) => {
    const newValues = value.filter((city) => city !== option);
    if (newValues.length === value.length) newValues.push(option);
    // onChange(newValues);
  };
  const btnText = text;
  return (
    <div>
      <div {...rest} className={cnButton} onClick={clickHandler}>
        {btnText}
      </div>
      {!disabled &&
        isShown &&
        options.map((option) => (
          <div key={option} onClick={() => changer(option)}>
            {option}
          </div>
        ))}
    </div>
  );
};

export default MultiDropdown;
