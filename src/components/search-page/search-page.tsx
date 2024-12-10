import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { postsSelectors } from '../../services/slices/postsSlice';
import { SearchPageUI } from '../ui/search-page/search-page';
import { fetchPosts } from '../../services/thunks/postsThunks';
import { SearchPageSkeleton } from '../ui/search-page/search-page-skeleton';

export const SearchPage: FC = () => {
  const searchParams = useSearchParams()[0];

  const queryLowerCase = searchParams.get('query')!.toLowerCase();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [])

  const posts = useSelector(postsSelectors.selectPosts)!;
  
  const filteredPosts = posts.filter(
    (post) =>
      post.city.toLowerCase().includes(queryLowerCase) ||
      post.title.toLowerCase().includes(queryLowerCase) ||
      post.text.toLowerCase().includes(queryLowerCase),
  );

  if (!posts.length) {
    return <SearchPageSkeleton />
  }

  return <SearchPageUI searchResults={filteredPosts} />;
}