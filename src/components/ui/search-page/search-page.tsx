import { FC } from 'react';
import { TPost } from '../../../utils/types';
import styles from './search-page.module.css';
import { SearchResult } from '../search-result/search-result';

type TSearchPageUIProps = {
  searchResults: TPost[];
};

export const SearchPageUI: FC<TSearchPageUIProps> = ({ searchResults }) => (
  <main className={styles.main}>
    {searchResults.length ? (
      <>
        <h2 className={styles.title}>
          Результаты поиска: {searchResults.length}
        </h2>
        <div className={styles.searchResultsList}>
          {searchResults.map((searchResult) => {
            const { id, created_at, city, title, image, text } = searchResult;

            const parser = new DOMParser();
            const htmlText = parser.parseFromString(text, 'text/html');

            return (
              <SearchResult
                id={id}
                created_at={created_at}
                city={city}
                title={title}
                image={image}
                htmlText={htmlText}
              />
            );
          })}
        </div>
      </>
    ) : (
      <h2 className={styles.title}>Нет результатов</h2>
    )}
  </main>
);
