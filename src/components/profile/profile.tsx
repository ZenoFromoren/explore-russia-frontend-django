import { FC } from 'react';
import { ProfileUI } from '../ui/profile/profile';
import { useDispatch, useSelector } from '../../services/store';
import { userActions, userSelectors } from '../../services/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCodeResetPassword } from '../../services/thunks/userThunks';

export const Profile: FC = () => {
  const userData = useSelector(userSelectors.selectUserData);

  const user = {
    userName: userData?.username,
    city: userData?.city,
    about: userData?.about,
    dateOfRegistration: userData?.date_joined,
    avatar: userData?.avatar,
  };

  const isCodeRequest = useSelector(userSelectors.selectIsCodeRequest);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userActions.userLogout());
  };

  const handleForgotPassword = () => {
    dispatch(getCodeResetPassword()).then((res) => {
      console.log(res.type)
      if (res.type === 'user/getCodeResetPassword/fulfilled') {
        navigate('/forgot-password');
      }
    });
  };

  return (
    <ProfileUI
      userName={user.userName!}
      city={user.city!}
      about={user.about!}
      dateOfRegistration={user.dateOfRegistration!}
      avatar={user.avatar!}
      isCodeRequest={isCodeRequest}
      handleLogout={handleLogout}
      handleForgotPassword={handleForgotPassword}
      locationState={{ background: location }}
    />
  );
};
