import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectService, CycleService, NavigatorService, TestCaseService } from '../../_services';
import { TestcaseFolderComponent } from './testcase-folder.component';
import { MockQueryableService } from '../../_utils';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';
import { PackageFilterPipe } from './package-filter.pipe';

describe('TestcaseFolderComponent', () => {
  let component: TestcaseFolderComponent;
  let fixture: ComponentFixture<TestcaseFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestcaseFolderComponent, PackageFilterPipe],
      providers: [
        { provide: ProjectService, useClass: MockQueryableService },
        { provide: CycleService, useClass: MockQueryableService },
        { provide: NavigatorService, useClass: MockQueryableService },
        { provide: TestCaseService, useClass: MockQueryableService },

      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ClarityModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
