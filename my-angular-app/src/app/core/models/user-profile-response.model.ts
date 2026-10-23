export interface UserProfileResponse {

  id: number;

  login: string;

  email: string;

  createdAt: string;

  passwordChangeRequired: boolean;

  roles?: unknown[];
}