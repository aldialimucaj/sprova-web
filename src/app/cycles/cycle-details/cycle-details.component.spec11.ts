import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CycleDetailsComponent } from './cycle-details.component';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CycleService, NavigatorService, AuthenticationService, TestCaseService } from '../../_services';
import { TestcasesGridComponent } from '../../testcases/testcases-grid/testcases-grid.component';

import { MomentModule } from 'ngx-moment';


describe('CycleDetailsComponent', () => {
  let component: CycleDetailsComponent;
  let fixture: ComponentFixture<CycleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CycleDetailsComponent, TestcasesGridComponent],
      providers: [
        CycleService,
        NavigatorService,
        TestCaseService,
        AuthenticationService
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MomentModule,
        ClarityModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleDetailsComponent);
    component = fixture.componentInstance;
    component.model = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
