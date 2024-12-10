import { FC, SyntheticEvent } from 'react';

type TReplyButtonProps = {
  className?: string;
  onClick?: (e: SyntheticEvent) => void;
};

export const ReplyButton: FC<TReplyButtonProps> = ({ className, onClick }) => (
  <svg
    className={className}
    onClick={onClick}
    width='26'
    height='27'
    viewBox='0 0 26 27'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M25 1V13C25 15.7614 22.7614 18 20 18H0.999999'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M1 18L8.32107 11.1789'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M1 18.25L8.32107 25.0711'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);
