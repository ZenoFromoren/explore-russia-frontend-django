import { FC, SyntheticEvent } from 'react';

type TSearchButtonProps = {
  onClick: (e: SyntheticEvent) => void;
  className?: string;
};

export const SearchButton: FC<TSearchButtonProps> = ({
  className,
  onClick,
}) => (
  <svg
    className={className}
    onClick={onClick}
    width='15'
    height='16'
    viewBox='0 0 15 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='8.24048' cy='6' r='5.5' stroke='currentColor' />
    <path
      d='M0.646482 14.2426C0.451219 14.4379 0.45122 14.7545 0.646482 14.9497C0.841744 15.145 1.15833 15.145 1.35359 14.9497L0.646482 14.2426ZM4.88912 9.99999L0.646482 14.2426L1.35359 14.9497L5.59623 10.7071L4.88912 9.99999Z'
      fill='currentColor'
    />
  </svg>
);
