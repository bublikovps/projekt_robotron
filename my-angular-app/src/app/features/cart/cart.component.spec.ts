import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { CartComponent } from './cart.component';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  const itemsSignal = signal<CartItem[]>([]);
  const itemCountSignal = signal<number>(0);
  const totalPriceSignal = signal<number>(0);

  let cartServiceMock: {
    items: ReturnType<typeof itemsSignal.asReadonly>;
    itemCount: ReturnType<typeof itemCountSignal.asReadonly>;
    totalPrice: ReturnType<typeof totalPriceSignal.asReadonly>;
    increaseQuantity: ReturnType<typeof vi.fn>;
    decreaseQuantity: ReturnType<typeof vi.fn>;
    removeFromCart: ReturnType<typeof vi.fn>;
    clearCart: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    itemsSignal.set([]);
    itemCountSignal.set(0);
    totalPriceSignal.set(0);

    cartServiceMock = {
      items: itemsSignal.asReadonly(),
      itemCount: itemCountSignal.asReadonly(),
      totalPrice: totalPriceSignal.asReadonly(),
      increaseQuantity: vi.fn(),
      decreaseQuantity: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte die Komponente erfolgreich erstellen', () => {
    expect(component).toBeTruthy();
  });

  it('sollte Brutto-, Netto- und MwSt.-Betrag (19%) korrekt berechnen', () => {
    // Arrange: Brutto = 1190 EUR -> Netto = 1000 EUR, MwSt = 190 EUR
    totalPriceSignal.set(1190);

    // Assert
    expect(component.grossTotal()).toBeCloseTo(1190, 2);
    expect(component.netTotal()).toBeCloseTo(1000, 2);
    expect(component.vatTotal()).toBeCloseTo(190, 2);
  });

  it('sollte bei leerem Warenkorb 0 für alle Summen zurückgeben', () => {
    // Arrange
    totalPriceSignal.set(0);

    // Assert
    expect(component.grossTotal()).toBe(0);
    expect(component.netTotal()).toBe(0);
    expect(component.vatTotal()).toBe(0);
  });

  it('sollte Benutzeraktionen (increase, decrease, remove, clearCart) an CartService delegieren', () => {
    // Act
    component.increase(101);
    component.decrease(101);
    component.remove(202);
    component.clearCart();

    // Assert
    expect(cartServiceMock.increaseQuantity).toHaveBeenCalledWith(101);
    expect(cartServiceMock.decreaseQuantity).toHaveBeenCalledWith(101);
    expect(cartServiceMock.removeFromCart).toHaveBeenCalledWith(202);
    expect(cartServiceMock.clearCart).toHaveBeenCalledTimes(1);
  });
});
