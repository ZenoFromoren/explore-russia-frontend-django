import { FC, SyntheticEvent, useState } from 'react';
import { ResetPasswordUI } from '../ui/reset-password/reset-password';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/thunks/userThunks';
import { userSelectors } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [isPasswordShowed, setIsPasswordShowed] = useState<boolean>(false);
  const [isRepeatPasswordShowed, setIsRepeatPasswordShowed] =
    useState<boolean>(false);

  const passwordError = !!password && password.length < 8;
  const repeatPasswordError =
    !!password && !!repeatPassword && password !== repeatPassword;

  const formValid =
    !!password && !!repeatPassword && !(passwordError || repeatPasswordError);

  const isCodeRequest = useSelector(userSelectors.selectIsCodeRequest);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showHidePassword = () => setIsPasswordShowed((prevState) => !prevState);
  const showHideRepeatPassword = () =>
    setIsRepeatPasswordShowed((prevState) => !prevState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser({ password })).then((res) => {
      if (res.type === 'user/updateUser/fulfilled') {
        navigate('../profile', { replace: true });
      }
    });
  };

  return (
    <ResetPasswordUI
      password={password}
      setPassword={setPassword}
      showHidePassword={showHidePassword}
      isPasswordShowed={isPasswordShowed}
      passwordError={passwordError}
      repeatPassword={repeatPassword}
      setRepeatPassword={setRepeatPassword}
      showHideRepeatPassword={showHideRepeatPassword}
      isRepeatPasswordShowed={isRepeatPasswordShowed}
      repeatPasswordError={repeatPasswordError}
      isCodeRequest={isCodeRequest}
      formValid={formValid}
      handleSubmit={handleSubmit}
    />
  );
};
