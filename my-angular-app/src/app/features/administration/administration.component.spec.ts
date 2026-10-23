import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { AdministrationComponent } from './administration.component';

describe('AdministrationComponent', () => {

  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AdministrationComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture =
      TestBed.createComponent(AdministrationComponent);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});