import {
  Component,
  computed,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import { CartService }
from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  private readonly cartService =
    inject(CartService);

  readonly items =
    this.cartService.items;

  readonly itemCount =
    this.cartService.itemCount;

  readonly grossTotal =
    this.cartService.totalPrice;

  readonly netTotal =
    computed(() =>
      this.grossTotal() / 1.19
    );

  readonly vatTotal =
    computed(() =>
      this.grossTotal() -
      this.netTotal()
    );

  increase(
    productId: number
  ): void {

    this.cartService
      .increaseQuantity(
        productId
      );

  }

  decrease(
    productId: number
  ): void {

    this.cartService
      .decreaseQuantity(
        productId
      );

  }

  remove(
    productId: number
  ): void {

    this.cartService
      .removeFromCart(
        productId
      );

  }

  clearCart(): void {

    this.cartService
      .clearCart();

  }

}
