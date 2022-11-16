export interface registerResponse {
  data: {
    accessToken: string;
  };
}
export function isAuthSuccess(obj: any): obj is registerResponse {
  return obj.data !== undefined;
}
