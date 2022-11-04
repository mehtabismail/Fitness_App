export interface SigninResponse {
  token: string;
}

export interface SigninRequest {
  username: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}
