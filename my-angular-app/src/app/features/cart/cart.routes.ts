import { Routes } from '@angular/router';

import { CartComponent }
from './cart.component';

import { CheckoutComponent }
from './checkout/checkout.component';

export const CART_ROUTES: Routes = [

  {
    path: 'cart',
    component: CartComponent
  },

  {
    path: 'checkout',
    component: CheckoutComponent
  }

];