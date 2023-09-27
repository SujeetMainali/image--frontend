export type Responses<T> = {
  success?: boolean;
  error: string | null;
  data: T[] | null;
  message: string | null;
};
export type Response<T> = {
  success?: boolean;
  error?: string | null;
  data?: T | null;
  message?: string | null;
  status?: boolean;
};

export type AxiosResponse<T> = {
  success?: boolean;
  status: string;
  message: string;
  data: T | T[] | null;
};
