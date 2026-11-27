export interface AssetModelResponse {

  id: number;

  assetCode: string;

  name: string;

  manufacturer: string;

  assetCategory: string;

  description: string;

  defaultPurchasePrice: number | null;

  expectedLifetimeMonths: number | null;

  defaultWarrantyMonths: number | null;

  active: boolean;

}