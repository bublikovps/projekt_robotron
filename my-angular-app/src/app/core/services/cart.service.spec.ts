import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { CartService } from './cart.service';
import { CatalogProductResponse } from '../../features/catalog/models/catalog-product-response.model';

describe('CartService', () => {
  const storageKey = 'robotron-cart';

  const createProduct = (
    overrides: Partial<CatalogProductResponse> = {}
  ): CatalogProductResponse =>
    ({
      id: 101,
      sku: 'SRV-RACK-01',
      name: 'Enterprise Server Rack',
      manufacturer: 'Robotron Hardware',
      imageUrl: '/assets/rack.png',
      price: 1500,
      lagerbestand: 5,
      ...overrides,
    } as unknown as CatalogProductResponse);

  const createService = (platformId: 'browser' | 'server' = 'browser'): CartService => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });
    return TestBed.inject(CartService);
  };

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('Initialisierung & LocalStorage / SSR', () => {
    it('sollte mit leerem Warenkorb starten, wenn localStorage leer ist', () => {
      const service = createService('browser');

      expect(service.items()).toEqual([]);
      expect(service.itemCount()).toBe(0);
      expect(service.totalPrice()).toBe(0);
    });

    it('sollte gespeicherte Artikel beim Start aus localStorage wiederherstellen', () => {
      // Arrange
      const savedItems = [
        {
          productId: 101,
          sku: 'SRV-01',
          name: 'Server',
          manufacturer: 'Robotron',
          imageUrl: '',
          price: 1000,
          quantity: 2,
          availableStock: 5,
        },
      ];
      localStorage.setItem(storageKey, JSON.stringify(savedItems));

      // Act
      const service = createService('browser');

      // Assert
      expect(service.items()).toHaveLength(1);
      expect(service.itemCount()).toBe(2);
      expect(service.totalPrice()).toBe(2000);
    });

    it('sollte defektes JSON im localStorage abfangen und den fehlerhaften Eintrag löschen', () => {
      // Arrange
      localStorage.setItem(storageKey, '{ungueltiges-json:::');

      // Act
      const service = createService('browser');

      // Assert
      expect(service.items()).toEqual([]);
      expect(localStorage.getItem(storageKey)).toBeNull();
    });

    it('sollte im SSR-Modus (server) nicht auf localStorage zugreifen', () => {
      // Arrange
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
      const service = createService('server');

      // Act
      service.addToCart(createProduct(), 1);

      // Assert
      expect(getItemSpy).not.toHaveBeenCalled();
      expect(setItemSpy).not.toHaveBeenCalled();
      expect(service.itemCount()).toBe(1);
    });
  });

  describe('Produktverwaltung & Berechnungen (Signals / Computed)', () => {
    it('sollte ein neues Produkt hinzufügen, Summen berechnen und in localStorage speichern', () => {
      // Arrange
      const service = createService('browser');
      const product = createProduct({ id: 1, price: 250, lagerbestand: 10 });

      // Act
      service.addToCart(product, 3);

      // Assert
      expect(service.items()).toHaveLength(1);
      expect(service.isInCart(1)).toBe(true);
      expect(service.getQuantity(1)).toBe(3);
      expect(service.itemCount()).toBe(3);
      expect(service.totalPrice()).toBe(750);

      const persisted = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(persisted).toHaveLength(1);
      expect(persisted[0].quantity).toBe(3);
    });

    it('sollte beim erneuten Hinzufügen desselben Produkts den Lagerbestand (lagerbestand) nicht überschreiten', () => {
      // Arrange
      const service = createService('browser');
      const product = createProduct({ id: 1, price: 100, lagerbestand: 4 });

      // Act
      service.addToCart(product, 2);
      service.addToCart(product, 5); // 2 + 5 = 7 -> gedeckelt auf 4

      // Assert
      expect(service.getQuantity(1)).toBe(4);
      expect(service.itemCount()).toBe(4);
      expect(service.totalPrice()).toBe(400);
    });

    it('sollte Gesamtpreis und Gesamtmenge über mehrere verschiedene Produkte korrekt berechnen', () => {
      // Arrange
      const service = createService('browser');
      const laptop = createProduct({ id: 1, price: 1200, lagerbestand: 10 });
      const mouse = createProduct({ id: 2, price: 50, lagerbestand: 20 });

      // Act
      service.addToCart(laptop, 2); // 2400
      service.addToCart(mouse, 3);  // 150

      // Assert
      expect(service.items()).toHaveLength(2);
      expect(service.itemCount()).toBe(5);
      expect(service.totalPrice()).toBe(2550);
    });
  });

  describe('Mengenänderung & Entfernen (Grenzwertanalyse)', () => {
    it('sollte increaseQuantity() um 1 erhöhen, aber am availableStock stoppen', () => {
      // Arrange
      const service = createService('browser');
      const product = createProduct({ id: 1, lagerbestand: 2 });
      service.addToCart(product, 1);

      // Act
      service.increaseQuantity(1); // -> 2
      service.increaseQuantity(1); // bleibt 2

      // Assert
      expect(service.getQuantity(1)).toBe(2);
    });

    it('sollte decreaseQuantity() bei Menge 1 den Artikel komplett aus dem Warenkorb entfernen', () => {
      // Arrange
      const service = createService('browser');
      const product = createProduct({ id: 1, lagerbestand: 5 });
      service.addToCart(product, 2);

      // Act
      service.decreaseQuantity(1); // -> 1
      expect(service.getQuantity(1)).toBe(1);

      service.decreaseQuantity(1); // -> 0 -> entfernt

      // Assert
      expect(service.isInCart(1)).toBe(false);
      expect(service.getQuantity(1)).toBe(0);
      expect(service.items()).toEqual([]);
    });

    it('sollte updateQuantity() auf den gültigen Bereich [1, availableStock] begrenzen', () => {
      // Arrange
      const service = createService('browser');
      const product = createProduct({ id: 1, lagerbestand: 5 });
      service.addToCart(product, 2);

      // Act & Assert: Untergrenze (<= 0 wird auf 1 gesetzt)
      service.updateQuantity(1, 0);
      expect(service.getQuantity(1)).toBe(1);

      service.updateQuantity(1, -10);
      expect(service.getQuantity(1)).toBe(1);

      // Act & Assert: Obergrenze (> availableStock wird auf 5 gedeckelt)
      service.updateQuantity(1, 99);
      expect(service.getQuantity(1)).toBe(5);
    });

    it('sollte Methoden für nicht vorhandene Produkt-IDs sicher ignorieren', () => {
      // Arrange
      const service = createService('browser');

      // Act & Assert (darf keinen Fehler werfen)
      expect(() => {
        service.increaseQuantity(999);
        service.decreaseQuantity(999);
        service.updateQuantity(999, 5);
        service.removeFromCart(999);
      }).not.toThrow();
    });

    it('sollte removeFromCart() und clearCart() den Zustand und localStorage bereinigen', () => {
      // Arrange
      const service = createService('browser');
      service.addToCart(createProduct({ id: 1 }), 1);
      service.addToCart(createProduct({ id: 2 }), 1);

      // Act 1: Einzelnes Produkt entfernen
      service.removeFromCart(1);
      expect(service.isInCart(1)).toBe(false);
      expect(service.isInCart(2)).toBe(true);

      // Act 2: Kompletten Warenkorb leeren
      service.clearCart();
      expect(service.items()).toEqual([]);
      expect(service.itemCount()).toBe(0);
      expect(localStorage.getItem(storageKey)).toBeNull();
    });
  });
});
