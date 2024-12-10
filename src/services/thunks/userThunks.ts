import { setCookie } from './../../utils/cookie';
import {
  TCodeResonse,
  TLoginData,
  TRegisterData,
  TUpdateData,
} from '../../utils/types';
import {
  getCodeConfirmRegistrationApi,
  getCodeForgotPasswordApi,
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

    setCookie('accessToken', userData.accessToken);
    // localStorage.setItem('refreshToken', userData.refreshToken);

    return userData.user;
  }
);

export const loginYandex = createAsyncThunk('user/loginYandex', async () => {
  const userData = await loginYandexApi();

  setCookie('accessToken', userData.accessToken);
  // localStorage.setItem('refreshToken', userData.refreshToken);

  return userData.user;
})

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerDTO: TRegisterData) => {
    const registerData = await registerUserApi(registerDTO);

    setCookie('accessToken', registerData.accessToken);

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
  async (registerData: TRegisterData): Promise<TCodeResonse> => {
    const userData = await getCodeConfirmRegistrationApi(registerData);
    return userData;
  }
);

export const getCodeForgotPassword = createAsyncThunk(
  'user/getCodeForgotPassword',
  async (): Promise<TCodeResonse> => {
    const userData = await getCodeForgotPasswordApi();
    return userData;
  }
);
