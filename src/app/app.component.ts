import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from './_models';
import { environment } from '../environments/environment';
import { AuthenticationService } from './_services';

@Component({
    selector: 'sprova',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    currentUser: User;
    environment: any;
    collapsed = true;
    projectId: string;
    cycleId: string;
    testSetId: string;

    constructor(private router: Router,
        private route: ActivatedRoute,
        public authenticationService: AuthenticationService,
        translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
        this.collapsed = false;
        this.environment = environment;
        let decodedToken = localStorage.getItem(this.environment.JWT_JSON_TOKEN_NAME);
        if (decodedToken) {
            this.currentUser = JSON.parse(decodedToken);
        }
    }

    ngOnInit() {
        this.router.events.subscribe(routerEvent => {
            if (routerEvent instanceof NavigationEnd) {
                this.route.root.firstChild
                    .params
                    .subscribe(params => {
                        this.cycleId = params.cycleId;
                        this.projectId = params.projectId;
                        this.testSetId = params.testSetId;
                    });
            }
        });

    }

}
