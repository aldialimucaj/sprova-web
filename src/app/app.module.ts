import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { GraphQLModuleModule } from './graphql.module';

import { MomentModule } from 'ngx-moment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FileDropModule } from 'ngx-file-drop';

import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/index';

import {
    AuthenticationService,
    TokenInterceptor,
    JwtInterceptor,
    ArtifactService,
    UserService,
    ProjectService,
    CycleService,
    TestSetService,
    TestCaseService,
    ExecutionService,
    TestSetExecutionService,
    NavigatorService
} from './_services/index';

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
import { TestSetExecutionsComponent } from './testsets/testset-executions/testset-executions.component';
import { ExecutionSetComponent } from './executions/execution-set/execution-set.component';
import { TestcaseSelectionComponent } from './testcases/testcase-selection/testcase-selection.component';
import { TestcaseTreeviewComponent } from './testcases/testcase-treeview/testcase-treeview.component';
import { NodeComponent } from './testcases/testcase-treeview/node/node.component';
import { ProjectReportComponent } from './reports/project-report/project-report.component';
import { CycleReportComponent } from './reports/cycle-report/cycle-report.component';
import { TestsetReportComponent } from './reports/testset-report/testset-report.component';
import { ExecutionSingleComponent } from './executions/execution-single/execution-single.component';
import { TestsetsDatagridComponent } from './testsets/testsets-datagrid/testsets-datagrid.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
    declarations: [
        AppComponent,
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
        TestsetsDatagridComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ClarityModule,
        MomentModule,
        FileDropModule,
        GraphQLModuleModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        ROUTING
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        AuthGuard,
        AuthenticationService,
        ArtifactService,
        UserService,
        ProjectService,
        CycleService,
        TestSetService,
        TestCaseService,
        ExecutionService,
        TestSetExecutionService,
        NavigatorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
