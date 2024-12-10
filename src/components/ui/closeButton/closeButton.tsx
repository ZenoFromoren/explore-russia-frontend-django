import { FC } from 'react';

type TCloseButtonProps = {
  onClose: () => void;
  className?: string;
};

export const CloseButton: FC<TCloseButtonProps> = ({ onClose, className }) => {
  return (
    <svg
      className={className}
      onClick={onClose}
      width='27'
      height='27'
      viewBox='0 0 27 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.999929 1.00007L12.543 12.543L25.0981 25.0983'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path
        d='M25.0981 1L13.7991 12.2991L0.999945 25.0982'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};
