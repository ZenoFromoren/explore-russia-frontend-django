import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '../ui/login/login';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/thunks/userThunks';
import { userSelectors } from '../../services/slices/userSlice';

export const Login: FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js";
    script.async = true;
  
    document.head.appendChild(script);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordShowed, setIsPasswordShowed] = useState<boolean>(false);

  const dispatch = useDispatch();

  const loginFormError = useSelector(userSelectors.selectLoginError);

  const showHidePassword = () => setIsPasswordShowed((prevState) => !prevState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isPasswordShowed={isPasswordShowed}
      showHidePassword={showHidePassword}
      loginFormError={loginFormError}
      handleSubmit={handleSubmit}
    />
  );
};
