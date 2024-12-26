import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { RegisterUI } from '../ui/register/register';
import { emailPattern } from '../../utils/constants';
import { userActions, userSelectors } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { getCodeConfirmRegistration } from '../../services/thunks/userThunks';

export const Register: FC = () => {
  const [username, setUserName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [about, setAbout] = useState('');

  const [isPasswordShowed, setIsPasswordShowed] = useState<boolean>(false);
  const [isRepeatPasswordShowed, setIsRepeatPasswordShowed] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const userNameError = !!username && username.length < 2;
  const emailError = !!email && !email.toLowerCase().match(emailPattern);
  const passwordError = !!password && password.length < 8;
  const repeatPasswordError =
    !!password && !!repeatPassword && password !== repeatPassword;

  const registerFormValid =
    !!username &&
    !!email &&
    !!password &&
    !!repeatPassword &&
    !(emailError || passwordError || repeatPasswordError);

  const registerFormError = useSelector(userSelectors.selectRegisterError);

  const isCodeRequest = useSelector(userSelectors.selectIsCodeRequest);

  const navigate = useNavigate();

  const clearRegisterError = () => {
    dispatch(userActions.clearRegisterError());
  };

  const showHidePassword = () => setIsPasswordShowed((prevState) => !prevState);
  const showHideRepeatPassword = () =>
    setIsRepeatPasswordShowed((prevState) => !prevState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(getCodeConfirmRegistration({ username, city: city || undefined, about: about || undefined, email, password })).then(
      (res) => {
        if (res.type === 'user/getCodeConfirmRegistration/fulfilled') {
          navigate('/confirm-email');
        }
      }
    );
  };

  return (
    <RegisterUI
      username={username}
      setUserName={setUserName}
      userNameError={userNameError}
      city={city}
      setCity={setCity}
      email={email}
      setEmail={setEmail}
      emailError={emailError}
      isCodeRequest={isCodeRequest}
      password={password}
      setPassword={setPassword}
      isPasswordShowed={isPasswordShowed}
      showHidePassword={showHidePassword}
      passwordError={passwordError}
      repeatPassword={repeatPassword}
      setRepeatPassword={setRepeatPassword}
      isRepeatPasswordShowed={isRepeatPasswordShowed}
      showHideRepeatPassword={showHideRepeatPassword}
      repeatPasswordError={repeatPasswordError}
      about={about}
      setAbout={setAbout}
      registerFormValid={registerFormValid}
      registerFormError={registerFormError}
      clearRegisterError={clearRegisterError}
      handleSubmit={handleSubmit}
    />
  );
};
