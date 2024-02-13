import './button.css';

interface ButtonProps {
  primary?: boolean;
  /** What background color to use*/
  backgroundColor?: string;
  /**How large should the button be?*/
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'reset' | 'submit';
  /*** Button contents*/
  label: string;
  iconImage?: string;
  outlined?: boolean;
  disabled?: boolean;
  /*** Optional click handler*/
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  iconImage,
  outlined = false,
  type = 'button',
  onClick = () => {},
  disabled = false,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : '';
  const isOutlined = outlined ? 'storybook-button--outlined' : '';
  return (
    <button
      type={type}
      className={[
        'storybook-button',
        `storybook-button--${size}`,
        `${disabled ? 'storybook-button--disabled' : ''}`,
        mode,
        isOutlined,
      ].join(' ')}
      style={{ backgroundColor }}
      onClick={() => {
        !disabled && onClick();
      }}
      {...props}
    >
      {iconImage && <img src={iconImage} alt="Missing icon image" />}
      <span>{label}</span>
    </button>
  );
};
