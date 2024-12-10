import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';
import { getUser, updateUser } from '../../services/thunks/userThunks';
import { UpdateProfileUI } from '../ui/update-profile/update-profile';
import { useNavigate } from 'react-router-dom';
import { defaultAbout } from '../../utils/constants';

export const UpdateProfile: FC = () => {
  const userData = useSelector(userSelectors.selectUserData)!;
  const { username, city, about } = userData;

  const [newUsername, setNewUserName] = useState<string>(username);
  const [newCity, setNewCity] = useState<string>(city);
  const [newAbout, setNewAbout] = useState<string | null>(about);

  const userNameError = !!newUsername && newUsername.length < 2;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        username: newUsername,
        city: newCity,
        about: `${newAbout?.length ? newAbout : defaultAbout}`,
      })
    );
    dispatch(getUser());
    navigate(-1);
  };

  return (
    <UpdateProfileUI
      username={newUsername}
      setUserName={setNewUserName}
      userNameError={userNameError}
      city={newCity}
      setCity={setNewCity}
      about={newAbout!}
      setAbout={setNewAbout}
      handleSubmit={handleSubmit}
    />
  );
};
