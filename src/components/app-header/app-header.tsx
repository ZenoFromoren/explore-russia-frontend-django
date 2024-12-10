import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { AppHeaderUI } from '../ui/app-header/app-header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.selectUserData)?.username;

  const [query, setQuery] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setQuery('');
  }, [location]);

  const searchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (query) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <AppHeaderUI
      userName={userName!}
      searchSubmit={searchSubmit}
      query={query}
      setQuery={setQuery}
    />
  );
};
