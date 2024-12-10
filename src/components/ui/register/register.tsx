import { FC, SyntheticEvent } from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import { ShowHidePasswordButton } from '../show-hide-password-button/show-hide-password-button';
import { Preloader } from '../preloader/preloader';

type TRegisterUIProps = {
  username: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  userNameError: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError: boolean;
  isCodeRequest: boolean;
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
  about: string;
  setAbout: React.Dispatch<React.SetStateAction<string>>;
  registerFormValid: boolean;
  registerFormError: string | undefined;
  clearRegisterError: () => void;
  handleSubmit: (e: SyntheticEvent) => void;
};

export const RegisterUI: FC<TRegisterUIProps> = ({
  username,
  setUserName,
  userNameError,
  city,
  setCity,
  email,
  setEmail,
  emailError,
  isCodeRequest,
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
  about,
  setAbout,
  registerFormValid,
  registerFormError,
  clearRegisterError,
  handleSubmit,
}) => {
  return (
    <main className={styles.main}>
      {isCodeRequest ? (
        <Preloader />
      ) : (
        <div className={styles.registerPage}>
          <h2 className={styles.title}>Регистрация</h2>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <div className={styles.inputBlock}>
              <input
                type='text'
                placeholder='Имя пользователя *'
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
            <div className={styles.inputBlock}>
              <input
                type='text'
                placeholder='Город'
                className={styles.input}
                onChange={(e) => setCity(e.target.value)}
                value={city}
                minLength={2}
                maxLength={30}
              />
            </div>
            {/* {
            !username && !registerFormValid && <p className={styles.error}>Вы пропустили это поле</p>
          } */}
            <div className={styles.inputBlock}>
              <input
                type='email'
                placeholder='e-mail *'
                className={styles.input}
                onChange={(e) => {
                  clearRegisterError();
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            {emailError && (
              <p className={styles.error}>Неверный формат электронной почты</p>
            )}
            {/* {
            !email && !registerFormValid && <p className={styles.error}>Вы пропустили это поле</p>
          } */}
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
            {/* {
            !repeatPassword && !registerFormValid && <p className={styles.error}>Вы пропустили это поле</p>
          } */}
            <textarea
              placeholder='О себе'
              className={styles.textarea}
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            />
            {registerFormError && (
              <p className={styles.error}>{registerFormError}</p>
            )}
            <button
              type='submit'
              className={styles.registerFormButton}
              disabled={!registerFormValid}
            >
              Зарегистрироваться
            </button>
          </form>
          <div className={styles.additionalLinks}>
            <Link to='/login'>
              <p className={styles.additionalLink}>Уже зарегистрированы?</p>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};
