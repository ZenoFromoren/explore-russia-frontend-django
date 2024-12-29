import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './post-list-skeleton.module.css';
import { PostCardSkeleton } from '../post-card/post-card-skeleton';

export const PostListSkeleton = () => (
  <main className={styles.main}>
    <div className={styles.content}>
      <Skeleton baseColor='#E1E1E1' className={styles.title} />
      <section className={styles.postsList}>
        {Array(3)
          .fill(3)
          .map((_item, index) => (
            <PostCardSkeleton key={index} />
          ))}
      </section>
    </div>
  </main>
);
