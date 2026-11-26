import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { CheckoutComponent } from './checkout.component';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../business-management/orders/services/order.service';
import { CartItem } from '../../../core/models/cart-item.model';
import { CurrentUserResponse } from '../../../core/models/current-user-response.model';
import { UserProfileResponse } from '../../../core/models/user-profile-response.model';
import { OrderResponse } from '../../business-management/orders/models/order-response.model';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let router: Router;

  const itemsSignal = signal<CartItem[]>([]);
  const totalPriceSignal = signal<number>(0);

  let cartServiceMock: {
    items: ReturnType<typeof itemsSignal.asReadonly>;
    totalPrice: ReturnType<typeof totalPriceSignal.asReadonly>;
    clearCart: ReturnType<typeof vi.fn>;
  };

  let authServiceMock: {
    getCurrentUser: ReturnType<typeof vi.fn>;
    getProfile: ReturnType<typeof vi.fn>;
  };

  let orderServiceMock: {
    createOrder: ReturnType<typeof vi.fn>;
  };

  const sampleCartItems: CartItem[] = [
    {
      productId: 101,
      sku: 'SRV-01',
      name: 'Enterprise Server',
      manufacturer: 'Robotron',
      imageUrl: '',
      price: 1190,
      quantity: 2,
      availableStock: 10,
    },
  ];

  beforeEach(async () => {
    vi.useFakeTimers();
    sessionStorage.clear();

    itemsSignal.set([...sampleCartItems]);
    totalPriceSignal.set(2380);

    cartServiceMock = {
      items: itemsSignal.asReadonly(),
      totalPrice: totalPriceSignal.asReadonly(),
      clearCart: vi.fn(),
    };

    authServiceMock = {
      getCurrentUser: vi.fn().mockReturnValue(
        of({ id: 1, role: 'ROLE_CUSTOMER' } as unknown as CurrentUserResponse)
      ),
      getProfile: vi.fn().mockReturnValue(
        of({
          customerType: 'BUSINESS',
          vorname: 'Pavel',
          nachname: 'Bublikov',
          companyName: 'Robotron GmbH',
          ustIdnr: 'DE123456789',
          defaultShippingAddress: 'Chemnitzer Str. 1, 09111 Chemnitz',
        } as unknown as UserProfileResponse)
      ),
    };

    orderServiceMock = {
      createOrder: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: OrderService, useValue: orderServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    sessionStorage.clear();
  });

  describe('Initialisierung & Profil-Vorbelegung', () => {
    it('sollte Profildaten eines angemeldeten Kunden automatisch in das Formular laden', () => {
      // Assert (ngOnInit lief bereits in beforeEach)
      expect(authServiceMock.getCurrentUser).toHaveBeenCalledTimes(1);
      expect(authServiceMock.getProfile).toHaveBeenCalledTimes(1);

      expect(component.isLoadingProfile).toBe(false);
      expect(component.customerType).toBe('BUSINESS');
      expect(component.vorname).toBe('Pavel');
      expect(component.nachname).toBe('Bublikov');
      expect(component.companyName).toBe('Robotron GmbH');
      expect(component.ustIdnr).toBe('DE123456789');
      expect(component.shippingAddress).toBe(
        'Chemnitzer Str. 1, 09111 Chemnitz'
      );
    });

    it('sollte nicht angemeldete Gäste auf "/register" umleiten und returnUrl="/checkout" speichern', () => {
      // Arrange
      authServiceMock.getCurrentUser.mockReturnValueOnce(
        throwError(() => ({ status: 401 }))
      );

      // Act: ngOnInit erneut auslösen
      component.ngOnInit();

      // Assert
      expect(sessionStorage.getItem('returnUrl')).toBe('/checkout');
      expect(router.navigate).toHaveBeenCalledWith(['/register']);
    });

    it('sollte isLoadingProfile auf false setzen, wenn getProfile() fehlschlägt', () => {
      // Arrange
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      authServiceMock.getProfile.mockReturnValueOnce(
        throwError(() => ({ status: 500 }))
      );

      // Act
      component.ngOnInit();

      // Assert
      expect(component.isLoadingProfile).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('Validierung vor Bestellabschluss', () => {
    it('sollte Bestellung abbrechen und Fehler anzeigen, wenn der Warenkorb leer ist', () => {
      // Arrange
      itemsSignal.set([]);

      // Act
      component.submitOrder();

      // Assert
      expect(component.errorMessage).toBe('Der Warenkorb ist leer.');
      expect(orderServiceMock.createOrder).not.toHaveBeenCalled();
    });

    it('sollte Fehler anzeigen, wenn Pflichtfelder (Vorname, Nachname, Lieferadresse) leer oder nur Leerzeichen sind', () => {
      // Arrange
      component.vorname = '   ';
      component.nachname = 'Bublikov';
      component.shippingAddress = 'Chemnitz';

      // Act
      component.submitOrder();

      // Assert
      expect(component.errorMessage).toBe(
        'Bitte füllen Sie alle Pflichtfelder aus.'
      );
      expect(orderServiceMock.createOrder).not.toHaveBeenCalled();
    });

    it('sollte bei Geschäftskunden (BUSINESS) einen Firmennamen verlangen', () => {
      // Arrange
      component.customerType = 'BUSINESS';
      component.companyName = '   ';

      // Act
      component.submitOrder();

      // Assert
      expect(component.errorMessage).toBe('Firmenname ist erforderlich.');
      expect(orderServiceMock.createOrder).not.toHaveBeenCalled();
    });

    it('sollte bei Privatkunden (PRIVATE) keinen Firmennamen verlangen', () => {
      // Arrange
      component.customerType = 'PRIVATE';
      component.companyName = '';
      orderServiceMock.createOrder.mockReturnValue(
        of({
          id: 99,
          orderNumber: 'ORD-2026-0099',
          totalPrice: 2380,
        } as unknown as OrderResponse)
      );

      // Act
      component.submitOrder();

      // Assert
      expect(component.errorMessage).toBe('');
      expect(orderServiceMock.createOrder).toHaveBeenCalledTimes(1);
    });
  });

  describe('Bestellübermittlung, Idempotency-Key & Weiterleitung', () => {
    it('sollte Bestellung mit getrimmten Feldern und UUID-IdempotencyKey senden, Warenkorb leeren und nach 1500ms zur Zahlung navigieren', () => {
      // Arrange
      const mockUuid = '11111111-2222-4333-8444-555555555555';
      vi.spyOn(crypto, 'randomUUID').mockReturnValue(mockUuid);

      component.vorname = '  Pavel  ';
      component.nachname = '  Bublikov ';
      component.shippingAddress = '  Chemnitzer Str. 1  ';

      const mockOrderResponse = {
        id: 777,
        orderNumber: 'ORD-2026-0777',
        totalPrice: 2380,
      } as unknown as OrderResponse;

      orderServiceMock.createOrder.mockReturnValue(of(mockOrderResponse));

      // Act
      component.submitOrder();

      // Assert: Request-Struktur prüfen
      expect(orderServiceMock.createOrder).toHaveBeenCalledWith({
        customerType: 'BUSINESS',
        vorname: 'Pavel',
        nachname: 'Bublikov',
        companyName: 'Robotron GmbH',
        ustIdnr: 'DE123456789',
        shippingAddress: 'Chemnitzer Str. 1',
        idempotencyKey: mockUuid,
        items: [{ productId: 101, quantity: 2 }],
      });

      // Assert: Zustand nach Erfolg prüfen
      expect(cartServiceMock.clearCart).toHaveBeenCalledTimes(1);
      expect(component.isSubmitting).toBe(false);
      expect(component.successMessage).toBe(
        'Bestellung ORD-2026-0777 erfolgreich angelegt.'
      );
      expect(router.navigate).not.toHaveBeenCalled();

      // Act: 1500ms Timer vorspulen
      vi.advanceTimersByTime(1500);

      // Assert: Weiterleitung zur Zahlung mit Query-Parametern
      expect(router.navigate).toHaveBeenCalledWith(['/payment'], {
        queryParams: {
          orderId: 777,
          orderNumber: 'ORD-2026-0777',
          totalPrice: 2380,
        },
      });
    });

    it('sollte Backend-Fehlermeldung anzeigen und isSubmitting zurücksetzen, wenn createOrder() fehlschlägt', () => {
      // Arrange
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      orderServiceMock.createOrder.mockReturnValue(
        throwError(() => ({
          status: 409,
          error: { message: 'Produkt ist zwischenzeitlich ausverkauft.' },
        }))
      );

      // Act
      component.submitOrder();

      // Assert
      expect(component.isSubmitting).toBe(false);
      expect(component.errorMessage).toBe(
        'Produkt ist zwischenzeitlich ausverkauft.'
      );
      expect(cartServiceMock.clearCart).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
