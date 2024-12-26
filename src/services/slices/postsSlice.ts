import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLastPosts,
  fetchPostById,
  fetchPosts,
  searchPosts,
} from '../thunks/postsThunks';
import { TComment, TCommentData, TPost } from '../../utils/types';
import { editComment, getComments } from '../thunks/commentsThunks';

export interface IPostsState {
  posts: TPost[];
  lastPosts: TPost[];
  currentPost: TPost | null;
  isLoading: boolean;
  searchResults: TPost[];
  isSearchResultsLoading: boolean;
  comments: TComment[];
  commentData: TCommentData | null;
}

const initialState: IPostsState = {
  posts: [],
  lastPosts: [],
  currentPost: null,
  isLoading: false,
  searchResults: [],
  isSearchResultsLoading: false,
  comments: [],
  commentData: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    setCommentData: (state, action) => {
      state.commentData = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectLastPosts: (state) => state.lastPosts,
    selectCurrentPost: (state) => state.currentPost,
    selectIsLoading: (state) => state.isLoading,
    selectSearchResults: (state) => state.searchResults,
    selectIsSearchResultsLoading: (state) => state.isSearchResultsLoading,
    selectComments: (state) => state.comments,
    selectCommentData: (state) => state.commentData,
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
        state.commentData = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(searchPosts.pending, (state) => {
        state.isSearchResultsLoading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.isSearchResultsLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchPosts.rejected, (state) => {
        state.isSearchResultsLoading = false;
      });
  },
});

export const postsActions = postsSlice.actions;
export const postsSelectors = postsSlice.selectors;

export default postsSlice.reducer;
