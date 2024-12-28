import { getCookie, setCookie } from './cookie';
import {
  TAuthResponse,
  TCodeResponse,
  TComment,
  TCreateCommentData,
  TCommentData,
  TLoginData,
  TPost,
  TRefreshResponse,
  TRegisterData,
  TUpdateData,
  TUser,
} from './types';

const URL = import.meta.env.VITE_URL;

export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      refresh: localStorage.getItem('refreshToken')?.replace('Bearer ', ''),
    }),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      setCookie('accessToken', `Bearer ${refreshData.access}`);
      return refreshData;
    });

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    const refreshData = await refreshToken();
    if (options.headers) {
      (options.headers as { [key: string]: string }).authorization =
        `Bearer ${refreshData.access}`;
    }
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  }
};

export const fetchPostsApi = async (): Promise<TPost[]> =>
  await fetch(`${URL}/posts`).then((res) => checkResponse<TPost[]>(res));

export const fetchLastPostsApi = async (): Promise<TPost[]> =>
  await fetch(`${URL}/posts/last`).then((res) => checkResponse<TPost[]>(res));

export const fetchPostByIdApi = async (postId: number): Promise<TPost> =>
  await fetch(`${URL}/posts/${postId}`).then((res) =>
    checkResponse<TPost>(res)
  );

export const searchPostsApi = async (query: string): Promise<TPost[]> =>
  await fetch(`${URL}/posts?search=${query}`).then((res) =>
    checkResponse<TPost[]>(res)
  );

export const loginUserApi = async (data: TLoginData): Promise<TAuthResponse> =>
  await fetch(`${URL}/signin/`, {
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
  await fetch(`${URL}/users/`, {
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
  await fetchWithRefresh<TUser>(`${URL}/users/me/`, {
    headers: {
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

export const updateUserApi = async (data: TUpdateData): Promise<TUser> =>
  await fetchWithRefresh<TUser>(`${URL}/users/me/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(data),
  });

export const getCodeConfirmRegistrationApi = async (
  registerData: TRegisterData
): Promise<TCodeResponse> =>
  await fetch(`${URL}/code/confirm_registration/`, {
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

export const getCodeResetPasswordApi = async (): Promise<TCodeResponse> =>
  await fetchWithRefresh<TCodeResponse>(`${URL}/code/reset_password/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  })
    .then((res) => res)
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export const getCommentsApi = async (postId: number) =>
  await fetch(`${URL}/posts/${postId}/comments`).then((res) =>
    checkResponse<any>(res)
  );

export const leaveACommentApi = async (
  createCommentData: TCreateCommentData
): Promise<TComment> =>
  await fetch(`${URL}/posts/${createCommentData.post}/comments/`, {
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
  editCommentData: TCommentData
): Promise<TComment> =>
  await fetch(
    `${URL}/posts/${editCommentData.postId}/comments/${editCommentData.id}/`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken'),
      } as HeadersInit,
      body: JSON.stringify({
        text: editCommentData.text,
      }),
    }
  )
    .then((res) => checkResponse<TComment>(res))
    .then((data) => {
      return data;
    })
    .catch((err) => Promise.reject(err));
