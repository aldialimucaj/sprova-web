import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { MomentModule } from 'ngx-moment';

import { MockNavigatorService } from '../../_utils';
import { NavigatorService } from '../../_services';
import { TestsetReportComponent } from './testset-report.component';

describe('TestsetReportComponent', () => {
  let component: TestsetReportComponent;
  let fixture: ComponentFixture<TestsetReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsetReportComponent ],
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
    fixture = TestBed.createComponent(TestsetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
