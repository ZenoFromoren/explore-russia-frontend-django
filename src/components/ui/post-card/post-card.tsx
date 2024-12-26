import { FC } from 'react';
import styles from './post-card.module.css'
import { TPostCard } from '../../../utils/types';

export const PostCard: FC<TPostCard> = ({ id, created_at, city, title, image }) => {
  return (
    <article className={styles.postCard} key={id}>
      <div className={styles.description}>
        <p className={styles.date}>{`${new Date(created_at).toLocaleDateString()}`}</p>
        <h3 className={styles.cityName}>{city}</h3>
        <p className={styles.title}>{title}</p>
      </div>
      <img className={styles.image} src={image} alt={`Фото ${city}`} />
    </article>
  )
};
