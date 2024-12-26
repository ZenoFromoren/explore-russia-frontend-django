import { FC } from 'react';
import { useSelector } from '../../services/store';
import { postsSelectors } from '../../services/slices/postsSlice';
import { SearchPageUI } from '../ui/search-page/search-page';
import { SearchPageSkeleton } from '../ui/search-page/search-page-skeleton';

export const SearchPage: FC = () => {
  const searchResults = useSelector(postsSelectors.selectSearchResults);
  const isSearchResultsLoading = useSelector(
    postsSelectors.selectIsSearchResultsLoading
  );

  return isSearchResultsLoading ? <SearchPageSkeleton /> : <SearchPageUI searchResults={searchResults} />;
};
