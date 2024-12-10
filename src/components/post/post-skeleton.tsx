import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './post-skeleton.module.css';

export const PostSkeleton = () => (
  <main className={styles.main}>
    <div className={styles.post}>
      <Skeleton baseColor='#E9E9E9' className={styles.post} />
      <div className={styles.titleBlock}>
        <Skeleton baseColor='#E1E1E1' className={styles.dateOfPublication} />
        <Skeleton baseColor='#E1E1E1' className={styles.cityName} />
        <Skeleton baseColor='#E1E1E1' className={styles.postTitleText} />
        <Skeleton baseColor='#E1E1E1' className={styles.postMainImage} />
      </div>
    </div>
  </main>
);
