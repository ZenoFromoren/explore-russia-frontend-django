import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './search-page-skeleton.module.css';
import { SearchResultSkeleton } from '../search-result/search-result-skeleton';

export const SearchPageSkeleton = () => (
  <main className={styles.main}>
    <Skeleton baseColor='#E1E1E1' className={styles.title} />
    <section className={styles.searchResultsList}>
      {Array(2)
        .fill(2)
        .map((_item, index) => (
          <SearchResultSkeleton key={index} />
        ))}
    </section>
  </main>
);