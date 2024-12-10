import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLastPosts,
  fetchPostById,
  fetchPosts,
} from '../thunks/postsThunks';
import { TComment, TEditCommentData, TPost } from '../../utils/types';
import { editComment, getComments } from '../thunks/commentsThunks';

export interface IPostsState {
  posts: TPost[];
  lastPosts: TPost[];
  currentPost: TPost | null;
  isLoading: boolean;
  comments: TComment[];
  editCommentData: TEditCommentData | null;
}

const initialState: IPostsState = {
  posts: [],
  lastPosts: [],
  currentPost: null,
  isLoading: false,
  comments: [],
  editCommentData: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    setEditCommentData: (state, action) => {
      state.editCommentData = action.payload;
    },
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectLastPosts: (state) => state.lastPosts,
    selectCurrentPost: (state) => state.currentPost,
    selectIsLoading: (state) => state.isLoading,
    selectComments: (state) => state.comments,
    selectEditCommentData: (state) => state.editCommentData,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLastPosts.fulfilled, (state, action) => {
        state.lastPosts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(editComment.fulfilled, (state) => {
        state.editCommentData = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export const postsActions = postsSlice.actions;
export const postsSelectors = postsSlice.selectors;

export default postsSlice.reducer;
