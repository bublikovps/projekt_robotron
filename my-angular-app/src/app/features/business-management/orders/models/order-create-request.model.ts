import { OrderItemRequest }
from './order-item-request.model';

export interface OrderCreateRequest {

  customerType:
    'PRIVATE'
    | 'BUSINESS';

  vorname: string;

  nachname: string;

  companyName: string;

  ustIdnr: string;

  shippingAddress: string;

  idempotencyKey: string;

  items: OrderItemRequest[];

}