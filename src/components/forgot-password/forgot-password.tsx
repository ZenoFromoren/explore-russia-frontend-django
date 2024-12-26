import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';
import { ForgotPasswordUI } from '../ui/forgot-password/forgot-password';
import { getCodeResetPassword } from '../../services/thunks/userThunks';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword: FC = () => {
  const [userCode, setUserCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const code = useSelector(userSelectors.selectCode);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (userCode != code) {
      setCodeError('Неверный код');
      return;
    }
    navigate('/reset-password');
  };

  const sendCodeAgain = () => {
    dispatch(getCodeResetPassword());
  } 

  return (
    <ForgotPasswordUI
      userCode={userCode}
      setUserCode={setUserCode}
      handleSubmit={handleSubmit}
      codeError={codeError}
      setCodeError={setCodeError}
      sendCodeAgain={sendCodeAgain}
    />
  );
};
