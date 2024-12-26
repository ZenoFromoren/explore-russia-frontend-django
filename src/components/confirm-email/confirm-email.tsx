import { FC, SyntheticEvent, useState } from 'react';
import { ConfirmEmailUI } from '../ui/confirm-email/confirm-email';
import { useDispatch, useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';
import { getCodeConfirmRegistration, registerUser } from '../../services/thunks/userThunks';
import { useNavigate } from 'react-router-dom';

export const ConfirmEmail: FC = () => {
  const [userCode, setUserCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerData = useSelector(userSelectors.selectRegisterData);
  const code = useSelector(userSelectors.selectCode);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (userCode != code) {
      setCodeError('Неверный код');
      return;
    }
    dispatch(registerUser(registerData!));
    navigate(-2)
  };

  const sendCodeAgain = () => {
    dispatch(getCodeConfirmRegistration(registerData!));
  } 

  return (
    <ConfirmEmailUI
      userCode={userCode}
      setUserCode={setUserCode}
      handleSubmit={handleSubmit}
      codeError={codeError}
      setCodeError={setCodeError}
      sendCodeAgain={sendCodeAgain}
    />
  );
};
