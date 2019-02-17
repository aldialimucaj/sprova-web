import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../../_services";

@Component({
  selector: 'sprova-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [UserService]
})
export class UserDetailsComponent implements OnInit {
  model: any;
  id: string;
  loading = true;

  constructor(public userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.id = params.userId;
        if (this.id) {
          this.userService.getModel(this.id).subscribe(data => {
            this.model = data;
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
      });
  }

}
