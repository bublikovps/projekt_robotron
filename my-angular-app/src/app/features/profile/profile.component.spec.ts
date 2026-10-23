import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture =
      TestBed.createComponent(ProfileComponent);

    component =
      fixture.componentInstance;

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should initialize password form', () => {

    expect(component.pwdData).toEqual({
      oldPassword: '',
      newPassword: ''
    });

  });

  it('should have loading flag', () => {


  });

});