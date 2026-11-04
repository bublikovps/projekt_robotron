export interface CurrentUserResponse {

  id: number;

  login: string;

  role: string;

  passwordChangeRequired: boolean;
}