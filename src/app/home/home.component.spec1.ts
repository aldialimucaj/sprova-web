/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { HomeComponent } from './home.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';


describe('HomeComponent', () => {

    let expectedMsg: string = '';

    let fixture: ComponentFixture<any>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent
            ],
            imports: [
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [HttpClient]
                    }
                }),
                ClarityModule
            ]
        });

        fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement;

    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the home page', async(() => {
        expect(compiled).toBeTruthy();
    }));

    /*it(`should display: '${expectedMsg}'`, async(() => {
        expect(compiled.querySelector('p').textContent).toMatch(expectedMsg);
    }));*/


});
