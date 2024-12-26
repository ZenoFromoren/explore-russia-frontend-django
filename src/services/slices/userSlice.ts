import {
  getCodeConfirmRegistration,
  getCodeResetPassword,
  getUser,
  loginUser,
  loginYandex,
  registerUser,
  updateUser,
} from './../thunks/userThunks';
import { createSlice } from '@reduxjs/toolkit';
import { TRegisterData, TUser } from '../../utils/types';
import { deleteCookie } from '../../utils/cookie';

export interface IUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TUser | null;
  isCodeRequest: boolean;
  loginError: string | undefined;
  registerError: string | undefined;
  registerData: TRegisterData | null;
  code: string | undefined;
}

export const initialState: IUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  isCodeRequest: false,
  loginError: undefined,
  registerError: undefined,
  registerData: null,
  code: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      deleteCookie('accessToken');
      state.userData = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    },
    clearRegisterError: (state) => {
      state.registerError = undefined;
    }
  },
  selectors: {
    selectUserData: (state) => state.userData,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selsectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsCodeRequest: (state) => state.isCodeRequest,
    selectLoginError: (state) => state.loginError,
    selectRegisterError: (state) => state.registerError,
    selectRegisterData: (state) => state.registerData,
    selectCode: (state) => state.code
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.registerError = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.registerError = action.error.code === '409' ? action.error.message as string : 'Ошибка сервера';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.registerError = undefined;
        state.registerData = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.loginError = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.loginError = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.loginError = undefined;
        state.userData = action.payload;
      })
      .addCase(loginYandex.pending, (state) => {
        state.isAuthenticated = false;
        state.loginError = undefined;
      })
      .addCase(loginYandex.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.loginError = action.error.message as string;
      })
      .addCase(loginYandex.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.loginError = undefined;
        state.userData = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.userData = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userData = action.payload;
      })
      .addCase(getCodeConfirmRegistration.pending, (state) => {
        state.isCodeRequest = true;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.code = undefined;
        state.registerError = undefined;
      })
      .addCase(getCodeConfirmRegistration.fulfilled, (state, action) => {
        state.isCodeRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.code = action.payload.code;
        state.registerError = undefined;
        state.registerData = action.payload.user;
      })
      .addCase(getCodeConfirmRegistration.rejected, (state, action) => {
        state.isCodeRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.registerError = action.error.message as string;
        state.code = undefined;
      })
      .addCase(getCodeResetPassword.pending, (state) => {
        state.isCodeRequest = true;
        state.code = undefined;
      })
      .addCase(getCodeResetPassword.fulfilled, (state, action) => {
        state.isCodeRequest = false;
        state.code = action.payload.code;
      })
      .addCase(getCodeResetPassword.rejected, (state) => {
        state.isCodeRequest = false;
        state.code = undefined;
      });
  },
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
