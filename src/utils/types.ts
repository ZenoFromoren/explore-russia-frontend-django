export type TPost = {
  id: number;
  createdAt: Date;
  city: string;
  title: string;
  image: string;
  text: string;
};

export type TPostCard = Omit<TPost, 'text' | 'comments'>;

export type TUser = {
  id: number;
  username: string;
  city: string;
  email: string;
  about: string;
  createdAt: string;
  avatar: string;
  yandexId: string;
};

export type TLoginData = {
  email: string;
  password: string;
};

export type TRefreshResponse = {
  refreshToken: string;
  accessToken: string;
};

export type TAuthResponse = {
  accessToken: string;
  user: TUser;
};

export type TRegisterData = TLoginData & {
  username: string;
  city: string;
  about?: string | null;
};

export type TUpdateData = {
  username?: string;
  city?: string;
  about?: string;
  avatar?: string;
  password?: string;
};

export type TCodeResonse = {
  user: TRegisterData;
  code: string;
};

export type TComment = {
  id: number;
  text: string;
  owner: TUser;
  post: TPost;
  replies: TComment[];
  parentId: number
  createdAt: Date;
  updatedAt: Date;
};

export type TCreateCommentData = {
  text: string;
  userId: number;
  postId: number;
};

export type TEditCommentData = {
  id: number;
  text: string;
};
