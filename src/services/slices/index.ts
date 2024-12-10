import { combineReducers } from '@reduxjs/toolkit';
import { postsSlice } from './postsSlice';
import { userSlice } from './userSlice';

const rootReducer = combineReducers({
  [postsSlice.name]: postsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export default rootReducer;
