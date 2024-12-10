import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './post-card-skeleton.module.css';

export const PostCardSkeleton = () => (
  <article className={styles.postCard}>
    <Skeleton baseColor='#E9E9E9' className={styles.postCard} />
    <div className={styles.description}>
      <Skeleton baseColor='#E1E1E1' className={styles.date} />
      <Skeleton baseColor='#E1E1E1' className={styles.cityName} />
      <Skeleton baseColor='#E1E1E1' className={styles.title} />
    </div>
    <Skeleton baseColor='#E1E1E1' className={styles.image} />
  </article>
);
