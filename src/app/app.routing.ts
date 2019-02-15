/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/login.component';
import { UsersComponent, UserEditComponent, UserDetailsComponent } from './users';
import { SettingsComponent } from "./settings/settings.component";
import {
    ProjectsComponent,
    ProjectEditComponent,
    ProjectDetailsComponent,
    ProjectTestcasesComponent,
    ProjectCyclesComponent
} from "./projects";

import { CyclesComponent, CycleEditComponent, CycleDetailsComponent } from "./cycles";
import { TestCasesComponent, TestCaseDetailsComponent, TestCaseEditComponent } from './testcases';
import { ExecutionsComponent, ExecutionDetailsComponent, ExecutionEditComponent, ExecutionManuallyComponent } from './executions';
import { TestSetsComponent, TestSetsEditComponent, TestSetsDetailsComponent } from './testsets';
import { ExecutionSetComponent } from './executions/execution-set/execution-set.component';

import { ProjectReportComponent, CycleReportComponent, TestsetReportComponent } from "./reports";
import { ExecutionSingleComponent } from './executions/execution-single/execution-single.component';
import { TestSetExecutionsComponent } from './testsets/testset-executions/testset-executions.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'users/edit/:userId', component: UserEditComponent, canActivate: [AuthGuard] },
    { path: 'users/edit', component: UserEditComponent, canActivate: [AuthGuard] },
    { path: 'users/:userId', component: UserDetailsComponent, canActivate: [AuthGuard] },

    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },

    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
    { path: 'projects/edit/:projectId', component: ProjectEditComponent, canActivate: [AuthGuard] },
    { path: 'projects/edit', component: ProjectEditComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId', component: ProjectDetailsComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/testcases', component: ProjectTestcasesComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/testcases/:testCaseId/children', component: ProjectTestcasesComponent, canActivate: [AuthGuard] },

    { path: 'projects/:projectId/cycles', component: ProjectCyclesComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/cycles/edit/:cycleId', component: CycleEditComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/cycles/:cycleId', component: CycleDetailsComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/cycles/:cycleId/testsets', component: TestSetsComponent, canActivate: [AuthGuard] },
    {
        path: 'projects/:projectId/cycles/:cycleId/testsets/edit/new',
        component: TestSetsEditComponent, canActivate: [AuthGuard]
    },
    {
        path: 'projects/:projectId/cycles/:cycleId/testsets/edit/:testSetId',
        component: TestSetsEditComponent, canActivate: [AuthGuard]
    },
    {
        path: 'projects/:projectId/cycles/:cycleId/testsets/:testSetId',
        component: TestSetsDetailsComponent, canActivate: [AuthGuard]
    },
    { path: 'projects/:projectId/cycles/edit/new', component: CycleEditComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/cycles/:cycleId/testcases/:testCaseId', component: TestCaseDetailsComponent, canActivate: [AuthGuard] },

    { path: 'projects/:projectId/testcases', component: TestCasesComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/testcases/edit/:testCaseId', component: TestCaseEditComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/testcases/edit/new', component: TestCaseEditComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/testcases/new/parent/:parentId', component: TestCaseEditComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/testcases/:testCaseId', component: TestCaseDetailsComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/testcases/:testCaseId/children', component: TestCasesComponent, canActivate: [AuthGuard] },

    { path: 'projects/:projectId/executions', component: ExecutionsComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/executions/edit/:executionId', component: ExecutionEditComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/executions/:executionId', component: ExecutionDetailsComponent, canActivate: [AuthGuard] },

    { path: 'projects/:projectId/cycles/:cycleId/executionsets/:testSetExecutionId', component: TestSetExecutionsComponent, canActivate: [AuthGuard] },

    // REPORTS
    { path: 'projects/:projectId/report', component: ProjectReportComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/cycles/:cycleId/report', component: CycleReportComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/cycles/:cycleId/testset/:testSetId/report', component: TestsetReportComponent, canActivate: [AuthGuard] },

    // EXECUTIONS

     // cycle single execution, if ?executionId then re-execution
     {
        path: 'projects/:projectId/cycles/:cycleId/testcases/:testCaseId/execute', component: ExecutionSingleComponent,
        canActivate: [AuthGuard]
    },
    // test set execution, if ?executionId then re-execution
    {
        path: 'projects/:projectId/cycles/:cycleId/testsets/:testSetId/executionsets/:testSetExecutionId/execute', component: ExecutionSetComponent,
        canActivate: [AuthGuard]
    },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: true });
