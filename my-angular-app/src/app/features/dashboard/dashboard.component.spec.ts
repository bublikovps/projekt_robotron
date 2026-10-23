import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    }).compileComponents();

    fixture =
      TestBed.createComponent(DashboardComponent);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should return Director role name', () => {

    component.role = 'ROLE_DIRECTOR';

    expect(
      component.getRoleDisplayName()
    ).toBe('Director');

  });

  it('should return Administrator role name', () => {

    component.role = 'ROLE_ADMIN';

    expect(
      component.getRoleDisplayName()
    ).toBe('Administrator');

  });

  it('should validate role correctly', () => {

    component.role = 'ROLE_ADMIN';

    

  });

});
