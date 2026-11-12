export interface ProductCreateRequest {

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

  categoryId: number;

}
