import { setCookie } from './../../utils/cookie';
import {
  TCodeResponse,
  TLoginData,
  TRegisterData,
  TUpdateData,
} from '../../utils/types';
import {
  getCodeConfirmRegistrationApi,
  getCodeResetPasswordApi,
  getUserApi,
  loginUserApi,
  loginYandexApi,
  registerUserApi,
  updateUserApi,
} from './../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const userData = await loginUserApi({ email, password });

    setCookie('accessToken', `Bearer ${userData.access}`);
    localStorage.setItem('refreshToken', `Bearer ${userData.refresh}`);

    return userData.user;
  }
);

export const loginYandex = createAsyncThunk('user/loginYandex', async () => {
  const userData = await loginYandexApi();

  setCookie('accessToken', userData.access);
  // localStorage.setItem('refreshToken', userData.refreshToken);

  return userData.user;
})

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerDTO: TRegisterData) => {
    const registerData = await registerUserApi(registerDTO);

    setCookie('accessToken', registerData.access);

    return registerData;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TUpdateData) => {
    const userData = await updateUserApi(data);
    return userData;
  }
);

export const getCodeConfirmRegistration = createAsyncThunk(
  'user/getCodeConfirmRegistration',
  async (registerData: TRegisterData): Promise<TCodeResponse> => {
    const userData = await getCodeConfirmRegistrationApi(registerData);
    return userData;
  }
);

export const getCodeResetPassword = createAsyncThunk(
  'user/getCodeResetPassword',
  async (): Promise<TCodeResponse> => {
    const userData = await getCodeResetPasswordApi();
    return userData;
  }
);
