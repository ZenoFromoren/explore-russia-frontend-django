import { FC } from 'react';

type TLeaveACommentButtonProps = {
  onClick: () => void;
  className?: string;
};

export const LeaveACommentButton: FC<TLeaveACommentButtonProps> = ({
  className,
  onClick,
}) => (
  <svg
    className={className}
    onClick={onClick}
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='20' cy='20' r='20' />
    <path d='M21 12L30 19.5L21 27V12Z' fill='white' />
    <line x1='10' y1='19.5' x2='27' y2='19.5' stroke='white' strokeWidth='5' />
  </svg>
);
