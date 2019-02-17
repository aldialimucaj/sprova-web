/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './app.module';
import { FileDropModule } from 'ngx-file-drop';
import {
    AuthenticationService,
    UserService,
    ProjectService
} from './_services/index';
import { AuthGuard } from './_guards/index';
import { ClarityModule } from '@clr/angular';
import { ROUTING } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { ProjectsComponent, ProjectDetailsComponent, ProjectEditComponent } from './projects';
import { CyclesComponent, CycleDetailsComponent, CycleEditComponent } from './cycles';
import { TestCasesComponent, TestCaseDetailsComponent, TestCaseEditComponent } from './testcases';
import { ExecutionsComponent, ExecutionDetailsComponent, ExecutionEditComponent } from './executions';
import { TestcasesGridComponent } from './testcases/testcases-grid/testcases-grid.component';
import { ExecutionManuallyComponent } from './executions/execution-manually/execution-manually.component';
import { ProjectTestcasesComponent } from './projects/project-testcases/project-testcases.component';
import { ProjectCyclesComponent } from './projects/project-cycles/project-cycles.component';
import { ExecutionPieComponent } from './charts/execution-pie/execution-pie.component';
import { ExecutionsGridComponent } from './executions/executions-grid/executions-grid.component';
import { TestcaseStepsComponent } from './testcases/testcase-steps/testcase-steps.component';
import { PackageFilterPipe } from './projects/project-testcases/package-filter.pipe';
import { TestSetsComponent } from './testsets/testsets.component';
import { TestSetsEditComponent } from './testsets/testsets-edit/testsets-edit.component';
import { TestSetsDetailsComponent } from './testsets/testsets-details/testsets-details.component';
import { ExecutionSetComponent } from './executions/execution-set/execution-set.component';
import { TestcaseSelectionComponent } from './testcases/testcase-selection/testcase-selection.component';
import { TestcaseTreeviewComponent } from './testcases/testcase-treeview/testcase-treeview.component';
import { NodeComponent } from './testcases/testcase-treeview/node/node.component';
import { ProjectReportComponent } from './reports/project-report/project-report.component';
import { CycleReportComponent } from './reports/cycle-report/cycle-report.component';
import { TestsetReportComponent } from './reports/testset-report/testset-report.component';
import { ExecutionSingleComponent } from './executions/execution-single/execution-single.component';
import { TestSetExecutionsComponent } from './testsets/testset-executions/testset-executions.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


describe('AppComponent', () => {

    let fixture: ComponentFixture<any>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                AboutComponent,
                HomeComponent,
                LoginComponent,
                UsersComponent,
                UserDetailsComponent,
                UserEditComponent,
                SettingsComponent,
                ProjectsComponent,
                ProjectDetailsComponent,
                ProjectEditComponent,
                CyclesComponent,
                CycleDetailsComponent,
                CycleEditComponent,
                TestCasesComponent,
                TestCaseDetailsComponent,
                TestCaseEditComponent,
                ExecutionsComponent,
                ExecutionDetailsComponent,
                ExecutionEditComponent,
                TestcasesGridComponent,
                ExecutionManuallyComponent,
                ProjectTestcasesComponent,
                ProjectCyclesComponent,
                ExecutionPieComponent,
                ExecutionsGridComponent,
                TestcaseStepsComponent,
                PackageFilterPipe,
                TestSetsComponent,
                TestSetsEditComponent,
                TestSetsDetailsComponent,
                TestSetExecutionsComponent,
                ExecutionSetComponent,
                TestcaseSelectionComponent,
                TestcaseTreeviewComponent,
                NodeComponent,
                ProjectReportComponent,
                CycleReportComponent,
                TestsetReportComponent,
                ExecutionSingleComponent,


            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MomentModule,
                HttpModule,
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [HttpClient]
                    }
                }),
                ClarityModule,
                FileDropModule,
                ROUTING
            ],

            providers: [{ provide: APP_BASE_HREF, useValue: '/' },
                AuthGuard,
                AuthenticationService,
                UserService,
                ProjectService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement;


    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the app', async(() => {
        expect(compiled).toBeTruthy();
    }));


});
