import { FC, SyntheticEvent } from 'react';
import styles from './editComment.module.css';

type TEditCommentProps = {
  newText: string;
  setNewText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};

export const EditCommentUI: FC<TEditCommentProps> = ({
  newText,
  setNewText,
  handleSubmit,
}) => (
  <form className={styles.editCommentForm} onSubmit={handleSubmit}>
    <textarea
      className={styles.textarea}
      value={newText}
      onChange={(e) => setNewText(e.target.value)}
    ></textarea>
    <button className={styles.submitButton}>Сохранить изменения</button>
  </form>
);
