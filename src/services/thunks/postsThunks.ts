import {
  fetchLastPostsApi,
  fetchPostsApi,
  fetchPostByIdApi,
  searchPostsApi,
} from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const posts = await fetchPostsApi();
  return posts;
});

export const fetchLastPosts = createAsyncThunk(
  'posts/fetchLastPosts',
  async () => {
    const posts = await fetchLastPostsApi();
    return posts;
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId: number) => {
    const post = await fetchPostByIdApi(postId);
    return post;
  }
);

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (query: string) => {
    const posts = await searchPostsApi(query);
    return posts;
  }
);
