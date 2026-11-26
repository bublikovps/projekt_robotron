export interface CustomerProfileUpdateRequest {

  customerType:
    'PRIVATE'
    | 'BUSINESS'
    | null;

  vorname: string;

  nachname: string;

  companyName: string;

  ustIdnr: string;

  defaultShippingAddress: string;

}