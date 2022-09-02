import Loader from '@components/Loader';
import cn from 'classnames';

import buttonStyles from './Button.module.scss';

export enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  loading = false,
  color = ButtonColor.primary,
  children,
  className,
  disabled,
  ...args
}) => {
  const colour = `button_color-${color}`;
  const buttonClass = cn(
    className,
    buttonStyles.button,
    loading || disabled ? buttonStyles.button_disabled : '',
    buttonStyles[colour]
  );
  return !loading && !disabled ? (
    <button className={buttonClass} {...args}>
      {children ? children : null}
    </button>
  ) : (
    <button className={buttonClass} disabled {...args}>
      <Loader />
      {children ? children : null}
    </button>
  );
};

export default Button;
