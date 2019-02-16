import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { UserService } from "../_services";
import { Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UsersComponent } from './users.component';
import { Queryable } from "app/_models";
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { GeneralMockService } from "../_services/general-mock.service";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;
  const defaultData = [{ "id": "1", "username": "foo", "firstname": "foo", "lastname": "bar", "email": "foo@bar.net", "status": null, "admin": true }];
  const defaultData1 = [
        { "id": "1", "username": "foo", "firstname": "foo", "lastname": "bar", "email": "foo@bar.net", "status": null, "admin": true },
        { "id": "1", "username": "nameless", "firstname": "nameless", "lastname": "lastnameless", "email": "name@less.net", "status": null, "admin": true }
      ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        { provide: UserService, useClass: GeneralMockService }
      ],
      imports: [
        RouterTestingModule,
        ClarityModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);

  });

  it('should be created', () => {
    userService['_testData'] = defaultData;
    component.loading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display table', () => {
    userService['_testData'] = defaultData;
    component.loading = false;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('.users-data-grid')).nativeElement;
    expect(el.textContent).toContain('foo', 'bar');
  });

  it('should display table with 2 users', () => {
    userService['_testData'] = defaultData1;
    component.loading = false;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('.users-data-grid')).nativeElement;
    expect(el.textContent).toContain('foo', 'bar');
    expect(el.textContent).toContain('nameless', 'lastnameless');
  });
});
