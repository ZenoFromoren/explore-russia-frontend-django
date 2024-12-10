import { PostCard } from '../post-card/post-card';
import styles from './posts-list.module.css';
import { Link } from 'react-router-dom';
import { TPost } from '../../../utils/types';
import { FC } from 'react';

type PostsListUIProps = {
  posts: TPost[];
};

export const PostsListUI: FC<PostsListUIProps> = ({ posts }) => (
  <main className={styles.main}>
    <div className={styles.content}>
      <h1 className={styles.title}>Последние публикации</h1>
      <section className={styles.postsList}>
        {posts.map((postData) => {
          const { id, createdAt, city, title, image } = postData;

          return (
            <Link to={`/posts/${id}`} className={styles.postLink} key={id}>
              <PostCard
                id={id}
                createdAt={createdAt}
                city={city}
                title={title}
                image={image}
              />
            </Link>
          );
        })}
      </section>
    </div>
  </main>
);
