import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './search-result-skeleton.module.css';

export const SearchResultSkeleton = () => (
  <article className={styles.searchResult}>
    <Skeleton baseColor='#E9E9E9' className={styles.searchResult} />
    <div className={styles.content}>
      <div className={styles.contentLeft}>
        <Skeleton baseColor='#E1E1E1' className={styles.date} />
        <Skeleton baseColor='#E1E1E1' className={styles.cityName} />
        <Skeleton baseColor='#E1E1E1' className={styles.title} />
        <Skeleton baseColor='#E1E1E1' className={styles.basicText} />
      </div>
      <Skeleton className={styles.image} />
    </div>
  </article>
);
