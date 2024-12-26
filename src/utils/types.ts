export type TPost = {
  id: number;
  created_at: Date;
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
  date_joined: string;
  avatar: string;
  yandexId: string;
};

export type TLoginData = {
  email: string;
  password: string;
};

type TServerResponse<T> = {
  success: boolean;
} & T;

export type TRefreshResponse = TServerResponse<{
  refresh: string;
  access: string;
}>;

export type TAuthResponse = {
  access: string;
  refresh: string;
  user: TUser;
};

export type TRegisterData = {
  email: string;
  password: string;
  username: string;
  city?: string | undefined;
  about?: string | undefined;
};

export type TUpdateData = {
  username?: string;
  city?: string;
  about?: string;
  avatar?: string;
  password?: string;
};

export type TCodeResponse = {
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
  created_at: Date;
  updated_at: Date;
  is_edited: boolean;
};

export type TCreateCommentData = {
  text: string;
  post: number;
  parent?: number | null;
};

export type TCommentData = {
  id: number;
  text?: string;
  postId: number;
};

export type TRepliesData = {
  parent: number;
  post: number;
}
