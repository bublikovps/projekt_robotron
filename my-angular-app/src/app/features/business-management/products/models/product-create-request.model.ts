export interface ProductCreateRequest {

  sku: string;

  name: string;

  manufacturer: string;

  description: string;

  price: number;

  lagerbestand: number;

  minimumStock: number;

  categoryId: number;

}