export interface ProductUpdateRequest {

  name: string;

  manufacturer: string;

  description: string;

  price: number;

  lagerbestand: number;

  minimumStock: number;

  categoryId: number;

}