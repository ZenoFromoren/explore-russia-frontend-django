import { FC, SyntheticEvent } from 'react';
import styles from './commentModal.module.css';

type TCommentModalProps = {
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};

export const CommentModalUI: FC<TCommentModalProps> = ({
  commentText,
  setCommentText,
  handleSubmit,
}) => (
  <form className={styles.editCommentForm} onSubmit={handleSubmit}>
    <textarea
      className={styles.textarea}
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
    ></textarea>
    <button className={styles.submitButton}>Сохранить изменения</button>
  </form>
);
