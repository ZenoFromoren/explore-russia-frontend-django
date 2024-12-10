import { FC } from 'react';
import styles from './profile.module.css';
import defaultAvatar from '../../../images/defaultAvatar.svg';
import mapPin from '../../../images/mapPin.svg';
import { Link, Location } from 'react-router-dom';
import { Preloader } from '../preloader/preloader';

type TProfileUIProps = {
  userName: string;
  city: string;
  about: string;
  dateOfRegistration: string;
  avatar: string;
  isCodeRequest: boolean;
  handleLogout: () => void;
  handleForgotPassword: () => void;
  locationState: { background: Location };
};

export const ProfileUI: FC<TProfileUIProps> = ({
  userName,
  city,
  about,
  dateOfRegistration,
  isCodeRequest,
  handleLogout,
  handleForgotPassword,
  locationState,
}) => {
  return (
    <main className={styles.main}>
      {isCodeRequest ? (
        <Preloader />
      ) : (
        <div className={styles.profilePage}>
          <div className={styles.contentLeft}>
            <img src={defaultAvatar} alt='Аватар' className={styles.avatar} />
            <div className={styles.additionalLinks}>
              <Link to='update' state={locationState}>
                <p className={styles.additionalLink}>Изменить данные профиля</p>
              </Link>
              <p
                className={styles.additionalLink}
                onClick={handleForgotPassword}
              >
                Сменить пароль
              </p>
              <p className={styles.additionalLink} onClick={handleLogout}>
                Выйти
              </p>
            </div>
          </div>
          <div className={styles.contentRight}>
            <div className={styles.contentRightTop}>
              <p className={styles.userName}>{userName}</p>
              <div className={styles.cityBlock}>
                <img src={mapPin} alt='Значок отметки на карте' />
                <p className={styles.city}>{city}</p>
              </div>
            </div>
            <div className={styles.contentRightBottom}>
              <p className={styles.about}>{about}</p>
              <p
                className={styles.dateOfRegistration}
              >{`Дата регистрации: ${new Date(dateOfRegistration).toLocaleDateString()}`}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
