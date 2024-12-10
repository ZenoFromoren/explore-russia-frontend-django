import { FC, SyntheticEvent } from 'react';

type TEditButtonProps = {
  className?: string;
  onClick?: (e: SyntheticEvent) => void;
};

export const EditButton: FC<TEditButtonProps> = ({ className, onClick }) => (
  <svg
    className={className}
    onClick={onClick}
    width='24'
    height='25'
    viewBox='0 0 24 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M3.00378 17.5873L18.8551 1.736'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M6.43713 21.0206L22.2884 5.16929'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M18.7088 1.88051V1.88051C19.4226 1.16671 20.5002 0.961842 21.4262 1.36389L21.4728 1.38415C22.0399 1.63038 22.4875 2.08968 22.7189 2.66296V2.66296C23.0727 3.53928 22.8685 4.54221 22.2003 5.21046L22.1195 5.2912'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M2.98853 17.6243L1.70825 22.3211L6.40509 21.0408'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);
