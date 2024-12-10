import { getCookie } from './cookie';
import {
  TAuthResponse,
  TCodeResonse,
  TComment,
  TCreateCommentData,
  TEditCommentData,
  TLoginData,
  TPost,
  TRegisterData,
  TUpdateData,
  TUser,
} from './types';

const URL = import.meta.env.VITE_URL;

export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const fetchPostsApi = async (): Promise<TPost[]> =>
  await fetch(`${URL}/posts`).then((res) => checkResponse<TPost[]>(res));

export const fetchLastPostsApi = async (): Promise<TPost[]> =>
  await fetch(`${URL}/posts/last`).then((res) => checkResponse<TPost[]>(res));

export const fetchPostByIdApi = async (postId: number): Promise<TPost> =>
  await fetch(`${URL}/posts/${postId}`).then((res) =>
    checkResponse<TPost>(res)
  );

export const loginUserApi = async (data: TLoginData): Promise<TAuthResponse> =>
  await fetch(`${URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject('Неверные почта или пароль');
    }
    return res.json();
  });

export const loginYandexApi = async (): Promise<TAuthResponse> => {
  const userData = await fetch(`${URL}/yandex`).then((res) =>
    checkResponse<TAuthResponse>(res)
  );

  return userData;
};

export const registerUserApi = async (
  data: TRegisterData
): Promise<TAuthResponse> =>
  await fetch(`${URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((data) => data);

export const getUserApi = async (): Promise<TUser> =>
  await fetch(`${URL}/users/me`, {
    headers: {
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  })
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((data) => data);

export const updateUserApi = async (data: TUpdateData): Promise<TUser> =>
  await fetch(`${URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      res.json().then((err: Error) => Promise.reject(err));
    }
    return res.json();
  });

export const getCodeConfirmRegistrationApi = async (
  registerData: TRegisterData
): Promise<TCodeResonse> =>
  await fetch(`${URL}/confirm-registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(registerData),
  })
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export const getCodeForgotPasswordApi = async (): Promise<TCodeResonse> =>
  await fetch(`${URL}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  })
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export const getCommentsApi = async (postId: number) =>
  await fetch(`${URL}/posts/${postId}/comments`).then((res) =>
    checkResponse<any>(res)
  );

export const leaveACommentApi = async (
  createCommentData: TCreateCommentData
): Promise<TComment> =>
  await fetch(`${URL}/comments/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(createCommentData),
  })
    .then((res) => checkResponse<TComment>(res))
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export const editCommentApi = async (
  editCommentData: TEditCommentData
): Promise<TComment> =>
  await fetch(`${URL}/comments/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(editCommentData),
  })
    .then((res) => checkResponse<TComment>(res))
    .then((data) => {
      return data;
    })
    .catch((err) => Promise.reject(err));
