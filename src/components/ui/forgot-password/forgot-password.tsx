import { FC, SyntheticEvent } from 'react';
import styles from './forgot-password.module.css';

type TForgotPasswordProps = {
  userCode: string;
  setUserCode: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
  codeError: string | null;
  setCodeError: React.Dispatch<React.SetStateAction<string | null>>;
  sendCodeAgain: () => void;
};

export const ForgotPasswordUI: FC<TForgotPasswordProps> = ({
  userCode,
  setUserCode,
  handleSubmit,
  codeError,
  setCodeError,
  sendCodeAgain,
}) => {
  return (
    <main className={styles.main}>
      <div className={styles.forgotPasswordPage}>
        <h2 className={styles.title}>Сброс пароля</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p>На указанную электронную почту был отправлен 4-ёх значный код</p>
          <div className={styles.inputBlock}>
            <input
              type='text'
              placeholder='Введите код'
              className={styles.input}
              onChange={(e) => {
                setCodeError(null);
                setUserCode(e.target.value);
              }}
              value={userCode}
              maxLength={4}
            />
          </div>
          {codeError && <p className={styles.error}>Неверный код</p>}
          <button className={styles.confirmEmailButton} type='submit'>
            Подтвердить
          </button>
        </form>
        <p className={styles.additionalLink} onClick={sendCodeAgain}>
          Отправить код ещё раз
        </p>
      </div>
    </main>
  );
};
