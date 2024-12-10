import { FC } from 'react';
import styles from './not-found-page.module.css';
import backgroundImage from '../../../images/background.webp';

export const NotFoundPage: FC = () => 
  <main className={styles.main}>
    <div className={styles.content}>
      <div className={styles.content__top}>
        <p className={styles.title}>404</p>
        <p className={styles.text}>Запрашиваемая страница не найдена</p>
      </div>
      <img src={backgroundImage} alt="Фото природа России" className={styles.image} />
    </div>
  </main>