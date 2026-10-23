export interface DeviceResponse {

  id: number;

  productId: number;

  productName: string;

  inventoryNumber: string;

  serialNumber: string;

  manufacturerAssetTag: string;

  purchaseDate: string | null;

  purchasePrice: number | null;

  warrantyUntil: string | null;

  status: string;

  location: string;

  notes: string;

  active: boolean;

}