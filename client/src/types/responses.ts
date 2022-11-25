export interface registerResponse {
  data: {
    accessToken: string;
  };
}

export interface ErrorType {
  data: { statusCode: number; message: string[] | string; error: string };
  status: number;
}

export function isAuthSuccess(obj: any): obj is registerResponse {
  return obj.data !== undefined;
}
