import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './search-result.module.css';

type TSearchResultProps = {
  id: number;
  created_at: Date;
  city: string;
  title: string;
  image: string;
  htmlText: Document;
};

export const SearchResult: FC<TSearchResultProps> = ({
  id,
  created_at,
  city,
  title,
  image,
  htmlText,
}) => (
  <Link to={`/posts/${id}`} className={styles.postLink}>
    <article className={styles.searchResult}>
      <div className={styles.contentLeft}>
        <div className={styles.contentTopLeft}>
          <p
            className={styles.date}
          >{`${new Date(created_at).toLocaleDateString()}`}</p>
          <p className={styles.cityName}>{city}</p>
          <p className={styles.title}>{title}</p>
        </div>
        <p className={styles.basicText}>
          {htmlText.querySelector('.basicText')?.textContent}
        </p>
      </div>
      <img className={styles.image} src={image} alt={`Фото статьи ${title}`} />
    </article>
  </Link>
);
