import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import {
  CartItem
} from '../models/cart-item.model';

import {
  PLATFORM_ID,
  inject
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  CatalogProductResponse
} from '../../features/catalog/models/catalog-product-response.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cartItemsSignal =
    signal<CartItem[]>([]);

  private readonly platformId =
  inject(PLATFORM_ID);

  readonly items =
    this.cartItemsSignal.asReadonly();

  readonly itemCount =
    computed(() =>
      this.cartItemsSignal()
        .reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        )
    );

  readonly totalPrice =
    computed(() =>
      this.cartItemsSignal()
        .reduce(
          (sum, item) =>
            sum + (item.price * item.quantity),
          0
        )
    );

  constructor() {

    this.loadFromStorage();

  }

  addToCart(
    product: CatalogProductResponse,
    quantity: number = 1
  ): void {

    const currentItems =
      [...this.cartItemsSignal()];

    const existingItem =
      currentItems.find(
        item =>
          item.productId === product.id
      );

    if (existingItem) {

      existingItem.quantity =
        Math.min(
          existingItem.quantity + quantity,
          product.lagerbestand
        );

    } else {

      currentItems.push({

        productId: product.id,

        sku: product.sku,

        name: product.name,

        manufacturer:
          product.manufacturer,

        imageUrl:
          product.imageUrl,

        price:
          product.price,

        quantity,

        availableStock:
          product.lagerbestand

      });

    }

    this.cartItemsSignal.set(
      currentItems
    );

    this.saveToStorage();

  }

  removeFromCart(
    productId: number
  ): void {

    this.cartItemsSignal.set(
      this.cartItemsSignal()
        .filter(
          item =>
            item.productId !== productId
        )
    );

    this.saveToStorage();

  }

  increaseQuantity(
    productId: number
  ): void {

    const items =
      [...this.cartItemsSignal()];

    const item =
      items.find(
        i =>
          i.productId === productId
      );

    if (!item) {
      return;
    }

    if (
      item.quantity >=
      item.availableStock
    ) {
      return;
    }

    item.quantity++;

    this.cartItemsSignal.set(
      items
    );

    this.saveToStorage();

  }

  decreaseQuantity(
    productId: number
  ): void {

    const items =
      [...this.cartItemsSignal()];

    const item =
      items.find(
        i =>
          i.productId === productId
      );

    if (!item) {
      return;
    }

    item.quantity--;

    if (item.quantity <= 0) {

      this.removeFromCart(
        productId
      );

      return;
    }

    this.cartItemsSignal.set(
      items
    );

    this.saveToStorage();

  }

  updateQuantity(
    productId: number,
    quantity: number
  ): void {

    const items =
      [...this.cartItemsSignal()];

    const item =
      items.find(
        i =>
          i.productId === productId
      );

    if (!item) {
      return;
    }

    item.quantity =
      Math.max(
        1,
        Math.min(
          quantity,
          item.availableStock
        )
      );

    this.cartItemsSignal.set(
      items
    );

    this.saveToStorage();

  }

  clearCart(): void {

    this.cartItemsSignal.set([]);

    localStorage.removeItem(
      'robotron-cart'
    );

  }

  isInCart(
    productId: number
  ): boolean {

    return this.cartItemsSignal()
      .some(
        item =>
          item.productId === productId
      );

  }

  getQuantity(
    productId: number
  ): number {

    return (
      this.cartItemsSignal()
        .find(
          item =>
            item.productId === productId
        )
        ?.quantity ?? 0
    );

  }

  private saveToStorage(): void {

  if (
    !isPlatformBrowser(
      this.platformId
    )
  ) {
    return;
  }

  localStorage.setItem(
    'robotron-cart',
    JSON.stringify(
      this.cartItemsSignal()
    )
  );

}

  private loadFromStorage(): void {

  if (
    !isPlatformBrowser(
      this.platformId
    )
  ) {
    return;
  }

  const storedCart =
    localStorage.getItem(
      'robotron-cart'
    );

  if (!storedCart) {
    return;
  }

  try {

    this.cartItemsSignal.set(
      JSON.parse(storedCart)
    );

  } catch {

    if (
  isPlatformBrowser(
    this.platformId
  )
) {

  localStorage.removeItem(
    'robotron-cart'
  );

}

  }

}

}