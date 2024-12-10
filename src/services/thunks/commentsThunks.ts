import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TComment,
  TCreateCommentData,
  TEditCommentData,
} from '../../utils/types';
import { editCommentApi, getCommentsApi, leaveACommentApi } from '../../utils/api';

export const leaveAComment = createAsyncThunk(
  'comments/leaveAComment',
  async (createCommentData: TCreateCommentData): Promise<TComment> => {
    const commentData = await leaveACommentApi(createCommentData);
    return commentData;
  }
);

export const editComment = createAsyncThunk(
  'comments/editComment',
  async (editCommentData: TEditCommentData): Promise<TComment> => {
    const commentData = await editCommentApi(editCommentData);
    return commentData;
  }
);

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (postId: number): Promise<TComment[]> => {
    const comments = await getCommentsApi(postId);
    return comments;
  }
);
