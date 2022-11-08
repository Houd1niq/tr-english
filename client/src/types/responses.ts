export interface registerResponse {
  data: {
    accessToken: string;
  };
}
export function isRegisterSuccess(obj: any): obj is registerResponse {
  return obj.data !== undefined;
}
