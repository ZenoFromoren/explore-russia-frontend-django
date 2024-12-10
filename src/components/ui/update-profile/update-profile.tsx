import { FC, SyntheticEvent } from 'react';
import styles from './update-profile.module.css';

type TUpdateProfileUIProps = {
  username: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  userNameError: boolean;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  about: string;
  setAbout: React.Dispatch<React.SetStateAction<string | null>>;
  handleSubmit: (e: SyntheticEvent) => void;
};

export const UpdateProfileUI: FC<TUpdateProfileUIProps> = ({
  username,
  setUserName,
  userNameError,
  city,
  setCity,
  about,
  setAbout,
  handleSubmit,
}) => (
  <form className={styles.updateProfileForm} onSubmit={handleSubmit}>
    <h3 className={styles.inputTitle}>Имя пользователя</h3>
    <div className={styles.inputBlock}>
      <input
        type='text'
        className={styles.input}
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        minLength={2}
        maxLength={30}
      />
    </div>
    {userNameError && (
      <p className={styles.error}>
        Имя пользователя должно быть длиной от 2 символов
      </p>
    )}
    <h3 className={styles.inputTitle}>Город</h3>
    <div className={styles.inputBlock}>
      <input
        type='text'
        className={styles.input}
        onChange={(e) => setCity(e.target.value)}
        value={city}
        minLength={2}
        maxLength={30}
      />
    </div>
    <h3 className={styles.inputTitle}>О себе</h3>
    <textarea
      className={styles.textArea}
      onChange={(e) => setAbout(e.target.value)}
      value={about}
    />
    <button type='submit' className={styles.updateProfileFormButton}>
      Сохранить изменения
    </button>
  </form>
);
