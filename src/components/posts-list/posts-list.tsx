import { FC, useEffect } from 'react';
import { PostsListUI } from '../ui/posts-list/post-list';
import { useDispatch, useSelector } from '../../services/store';
import { fetchLastPosts } from '../../services/thunks/postsThunks';
import { postsSelectors } from '../../services/slices/postsSlice';
import { PostListSkeleton } from '../ui/posts-list/post-list-skeleton';

export const PostsList: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLastPosts());
  }, []);

  const posts = useSelector(postsSelectors.selectLastPosts);
  const isLoading = useSelector(postsSelectors.selectIsLoading);

  if (isLoading) {
    return <PostListSkeleton />
  }

  return (
    <PostsListUI posts={posts}/>
  )
}
