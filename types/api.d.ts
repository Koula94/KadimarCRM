export interface ApiError {
  error: string;
  message?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface RegisterResponse {
  token: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}
