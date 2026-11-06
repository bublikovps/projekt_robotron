export interface SoftwareLicenseResponse {

  id: number;

  licenseNumber: string;

  softwareName: string;

  vendor: string;

  licenseKey: string | null;

  licenseType: string;

  quantity: number;

  usedQuantity: number;

  availableQuantity: number;

  purchaseDate: string | null;

  expirationDate: string | null;

  status: string;

  active: boolean;

  notes: string | null;

}