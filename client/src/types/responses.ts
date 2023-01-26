export interface registerResponse {
  data: {
    accessToken: string;
  };
}

export interface refreshResponse {
  data: {
    accessToken: string;
  };
}

export interface ErrorType {
  data: { statusCode: number; message: string[] | string; error: string };
  status: number;
}
