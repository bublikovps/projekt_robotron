export interface UserProfileResponse {

  id: number;

  login: string;

  email: string;

  customerType?: string;

  vorname?: string;

  nachname?: string;

  companyName?: string;

  ustIdnr?: string;

  defaultShippingAddress?: string;

  accountBalance?: number;

  createdAt: string;

  passwordChangeRequired: boolean;

}