import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from "@angular/common/http";
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { MomentModule } from 'ngx-moment';

import { MockNavigatorService } from "../../_utils";
import { NavigatorService } from "../../_services";
import { ProjectReportComponent } from './project-report.component';

describe('ProjectReportComponent', () => {
  let component: ProjectReportComponent;
  let fixture: ComponentFixture<ProjectReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectReportComponent ],
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
    fixture = TestBed.createComponent(ProjectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
