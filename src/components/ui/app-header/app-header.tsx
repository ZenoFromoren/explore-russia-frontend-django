import { FC, SyntheticEvent } from 'react';
import styles from './app-header.module.css';
import logo from '../../../images/logo.svg';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { SearchButton } from '../search-button/search-button';

type TAppHeaderUIProps = {
  userName: string;
  searchSubmit: (e: SyntheticEvent) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  searchSubmit,
  query,
  setQuery,
}) => (
  <header className={styles.header}>
    <div className={styles.content}>
      <Link to='/'>
        <img src={logo} alt='Лого' className={styles.headerLogo} />
      </Link>
      <div className={styles.contentLeft}>
        <p className={styles.description}>Сайт о городах России и не только</p>
        <nav className={styles.navMenu}>
          <Link to='/'>
            <p className={styles.navListItem}>Главная</p>
          </Link>
          <p className={clsx(styles.navListItem, styles.navMap)}>Карта</p>
          <p className={clsx(styles.navListItem, styles.navListItem_dropdown)}>
            Статьи
            <svg
              width='11'
              height='6'
              viewBox='0 0 11 6'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g className={styles.arrow}>
                <path
                  d='M1 1L5.24264 5.24264'
                  stroke='currentColor'
                  strokeLinecap='round'
                />
                <path
                  d='M9.53564 1L5.293 5.24264'
                  stroke='currentColor'
                  strokeLinecap='round'
                />
              </g>
            </svg>
          </p>
        </nav>
      </div>
      <div className={styles.contentRight}>
        <Link to='/profile'>
          <div className={styles.account}>
            <svg className={styles.profileIcon}
              width='12'
              height='22'
              viewBox='0 0 12 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 20.7143V20.7143C2.29493 15.4798 9.76458 15.4655 11 20.7143V20.7143'
                stroke='currentColor'
                strokeLinecap='round'
              />
              <circle cx='6.00005' cy='12.8572' r='2.35723' stroke='currentColor' />
            </svg>
            <p className={styles.accountText}>{userName || 'Войти'}</p>
          </div>
        </Link>
        <div className={styles.inputBlock}>
          <input
            className={styles.searchBar}
            type='text'
            placeholder='Например: Иваново'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchButton onClick={searchSubmit} className={styles.searchButton} />
        </div>
      </div>
    </div>
  </header>
);
