import { Component, OnInit } from '@angular/core';
import { GenericForm } from 'app/_utils';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { UserService, NavigatorService } from 'app/_services';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/_models';

@Component({
  selector: 'sprova-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends GenericForm implements OnInit {
  public model: User;
  public _id: string;

  public editMode = false;
  public loading = true;
  public submitted = false;
  public statusTypes = ['active', 'inactive', 'deleted'];

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private navigatorService: NavigatorService,
    private route: ActivatedRoute
  ) {
    super();
    this.form = this.getFormGroup();
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        if (params.userId) {
          this.editMode = true;
          this._id = params.userId;
          this.userService.getModel<User>(this._id).subscribe(data => {
            this.model = data;
            this.form = this.getFormGroup(this.model);
            this.loading = false;
          },
          error => {
            console.error(error);
          })
        } else {
          this.model = new User();
          this.form = this.getFormGroup(this.model);
          this.loading = false;
        }
      });
  }

  onSubmit() {
    if (this.editMode) {
      this.update();
    } else {
      this.addNew();
    }
  }

  update() {
    this.userService.update(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.showUsers();
      }, error => {
        this.submitted = false;
      })
  }

  addNew() {
    this.userService.push(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.showUsers();
      }, error => {
        this.submitted = false;
      })
  }

  getFormGroup(data?: User): FormGroup {
    return this.fb.group({
      username: new FormControl(data ? data.username : '', Validators.required),
      password: new FormControl(data ? data.password : '', Validators.required),
      firstname: new FormControl(data ? data.firstname : '', Validators.required),
      lastname: new FormControl(data ? data.lastname : '', Validators.required),
      status: new FormControl(data ? data.status : 'active'),
      email: new FormControl(data ? data.email : ''),
      admin: new FormControl(data ? data.admin : false)
    });
  }

}
