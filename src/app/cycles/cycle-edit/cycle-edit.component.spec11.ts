import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { CycleEditComponent } from './cycle-edit.component';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CycleService, NavigatorService, AuthenticationService } from "../../_services";

import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CycleEditComponent', () => {
  let component: CycleEditComponent;
  let fixture: ComponentFixture<CycleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CycleEditComponent],
      providers: [
        CycleService,
        NavigatorService,
        AuthenticationService
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ClarityModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleEditComponent);
    component = fixture.componentInstance;
    component.testCases = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
