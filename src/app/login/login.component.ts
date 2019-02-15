import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/index';
import { User } from '../_models';
import { LABELS } from "../../environments/environment";


@Component({
  selector: 'sprova-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loading = false;
  returnUrl: string;
  labels = LABELS;
  error: any;

  model = new User();

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // TODO: mark this the url that brought the client here
    this.returnUrl = '/home';

    this.authService.logout();
  }

  ngOnInit() {
    // check login state, otherwise logout and redirect
    this.route
      .queryParams
      .subscribe(params => {
        this.returnUrl = params.returnUrl || '/home';
      });
  }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.model.username, this.model.password).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loading = false;
      });

  }

}
