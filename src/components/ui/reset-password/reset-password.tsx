import { FC, SyntheticEvent } from 'react';
import styles from './reset-password.module.css';
import { ShowHidePasswordButton } from '../show-hide-password-button/show-hide-password-button';

type TResetPasswordUIProps = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isPasswordShowed: boolean;
  showHidePassword: () => void;
  passwordError: boolean;
  repeatPassword: string;
  setRepeatPassword: React.Dispatch<React.SetStateAction<string>>;
  isRepeatPasswordShowed: boolean;
  showHideRepeatPassword: () => void;
  repeatPasswordError: boolean;
  isCodeRequest: boolean;
  formValid: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
};

export const ResetPasswordUI: FC<TResetPasswordUIProps> = ({
  password,
  setPassword,
  isPasswordShowed,
  showHidePassword,
  passwordError,
  repeatPassword,
  setRepeatPassword,
  isRepeatPasswordShowed,
  showHideRepeatPassword,
  repeatPasswordError,
  formValid,
  handleSubmit,
}) => {
  return (
    <main className={styles.main}>
      <div className={styles.resetPasswordPage}>
        <h2 className={styles.title}>Сброс пароля</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.formInfo}>На указанную электронную почту был отправлен 4-ёх значный код</p>
          <div className={styles.inputBlock}>
            <input
              type={isPasswordShowed ? 'text' : 'password'}
              placeholder='Пароль *'
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <ShowHidePasswordButton
              onClick={showHidePassword}
              className={styles.showHidePasswordButton}
            />
          </div>
          {passwordError && (
            <p className={styles.error}>
              Пароль должен быть не менее 8 символов
            </p>
          )}
          {/* {
            !password && !registerFormValid && <p className={styles.error}>Вы пропустили это поле</p>
          } */}
          <div className={styles.inputBlock}>
            <input
              type={isRepeatPasswordShowed ? 'text' : 'password'}
              placeholder='Повторите пароль *'
              className={styles.input}
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
            />
            <ShowHidePasswordButton
              onClick={showHideRepeatPassword}
              className={styles.showHidePasswordButton}
            />
          </div>
          {repeatPasswordError && (
            <p className={styles.error}>Пароли не совпадают</p>
          )}
          <button className={styles.confirmEmailButton} type='submit' disabled={!formValid}>
            Подтвердить
          </button>
        </form>
      </div>
    </main>
  );
};
