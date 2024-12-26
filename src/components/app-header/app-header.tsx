import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { AppHeaderUI } from '../ui/app-header/app-header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';
import { searchPosts } from '../../services/thunks/postsThunks';
import { postsActions } from '../../services/slices/postsSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.selectUserData)?.username;

  const [query, setQuery] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setQuery('');
    dispatch(postsActions.clearSearchResults());
  }, [location]);

  const searchSubmit = (e: SyntheticEvent | KeyboardEvent) => {
    e.preventDefault();

    if (query) {
      const queryLowerCase = query.toLowerCase();
      dispatch(searchPosts(queryLowerCase));
      navigate(`/search?query=${queryLowerCase}`);
    }
  };

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      e.key === 'Enter' && searchSubmit(e);
    };

    document.addEventListener('keydown', handleEnter);
    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, [searchSubmit]);

  return (
    <AppHeaderUI
      userName={userName!}
      searchSubmit={searchSubmit}
      query={query}
      setQuery={setQuery}
    />
  );
};
