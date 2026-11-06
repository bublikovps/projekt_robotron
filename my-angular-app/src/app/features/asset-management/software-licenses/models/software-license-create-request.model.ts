export interface SoftwareLicenseCreateRequest {

  licenseNumber: string;

  softwareName: string;

  vendor: string;

  licenseKey: string;

  licenseType: string;

  quantity: number;

  purchaseDate: string | null;

  expirationDate: string | null;

  status: string;

  notes: string;

}