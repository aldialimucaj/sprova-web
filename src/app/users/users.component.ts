import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'sprova-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  model: User[];
  loading = true;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.fetchAll(0, 0).subscribe( data => {
      this.model = data;
      this.loading = false;
    });
  }


}
