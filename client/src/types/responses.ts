export interface registerResponse {
  data: {
    accessToken: string;
  };
}

export type refreshResponse = {
  data?: {
    accessToken: string;
  };
  error?: {
    status: number;
    data: {
      statusCode: number;
      message: string;
    };
  };
};

export interface ErrorType {
  data: { statusCode: number; message: string[] | string; error: string };
  status: number;
}
