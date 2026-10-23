export interface DeviceCreateRequest {

  productId: number;

  inventoryNumber: string;

  serialNumber: string;

  manufacturerAssetTag: string;

  purchaseDate: string | null;

  purchasePrice: number | null;

  warrantyUntil: string | null;

  status: string;

  location: string;

  notes: string;

}