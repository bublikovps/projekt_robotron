import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte die Komponente erfolgreich erstellen', () => {
    expect(component).toBeTruthy();
  });

  it('sollte für ROLE_DIRECTOR den Anzeigenamen "Director" zurückgeben', () => {
    component.role = 'ROLE_DIRECTOR';
    expect(component.getRoleDisplayName()).toBe('Director');
  });

  it('sollte für ROLE_ADMIN den Anzeigenamen "Administrator" zurückgeben', () => {
    component.role = 'ROLE_ADMIN';
    expect(component.getRoleDisplayName()).toBe('Administrator');
  });

  it('sollte gesetzte Rollenwerte konsistent verarbeiten', () => {
    component.role = 'ROLE_ADMIN';
    expect(component.role).toBe('ROLE_ADMIN');
    expect(component.getRoleDisplayName()).toBeTruthy();
  });
});
