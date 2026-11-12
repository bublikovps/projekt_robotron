export interface ProductResponse {

  id: number;

  sku: string;

  name: string;

  manufacturer: string;

  description: string;

  price: number;

  purchasePrice: number;

  salePrice: number;

  supplier: string;

  imageUrl: string;

  lagerbestand: number;

  minimumStock: number;

  active: boolean;

  categoryId: number;

  categoryName: string;

  createdAt: string;

  updatedAt: string;

}
