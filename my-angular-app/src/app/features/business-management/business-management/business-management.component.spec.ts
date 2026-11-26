import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { BusinessManagementComponent } from './business-management.component';

describe('BusinessManagementComponent', () => {
  let component: BusinessManagementComponent;
  let fixture: ComponentFixture<BusinessManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessManagementComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('sollte die Komponente erfolgreich erstellen', () => {
    expect(component).toBeTruthy();
  });
});
