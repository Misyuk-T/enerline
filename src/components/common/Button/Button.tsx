import { ButtonProps, ButtonStyleProps, ButtonVariant } from '@/types';

const VARIANT_CLASS_NAME: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'bg-primary text-white hover:bg-primary/90',
  [ButtonVariant.Secondary]: 'bg-secondary text-white hover:bg-secondary/90',
  [ButtonVariant.Outline]:
    'border border-white/70 bg-white/10 text-white hover:bg-white hover:text-primary',
  [ButtonVariant.Ghost]:
    'border border-border bg-white text-text hover:border-primary hover:text-primary',
};

const getButtonClassName = ({
  variant = ButtonVariant.Primary,
  fullWidth = false,
  className = '',
}: ButtonStyleProps) =>
  [
    'inline-flex items-center justify-center rounded-button px-5 py-3 text-sm font-semibold transition duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    VARIANT_CLASS_NAME[variant],
    fullWidth ? 'w-full sm:w-auto' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

export const Button = (props: ButtonProps) => {
  if (props.href) {
    const { children, className, fullWidth, href, onClick, rel, target, variant } = props;

    return (
      <a
        className={getButtonClassName({ className, fullWidth, variant })}
        href={href}
        onClick={onClick}
        rel={rel}
        target={target}
      >
        {children}
      </a>
    );
  }

  const { children, className, disabled, fullWidth, onClick, type = 'button', variant } = props;

  return (
    <button
      className={getButtonClassName({ className, fullWidth, variant })}
      disabled={disabled}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};
