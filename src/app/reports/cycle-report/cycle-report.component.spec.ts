import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { MomentModule } from 'ngx-moment';

import { MockNavigatorService } from '../../_utils';
import { NavigatorService } from '../../_services';

import { CycleReportComponent } from './cycle-report.component';

describe('CycleReportComponent', () => {
  let component: CycleReportComponent;
  let fixture: ComponentFixture<CycleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleReportComponent ],
      providers: [
        { provide: NavigatorService, useClass: MockNavigatorService }
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ClarityModule,
        MomentModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
