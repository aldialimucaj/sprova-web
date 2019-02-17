import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GenericForm } from '../../_utils';
import { ExecutionService, NavigatorService } from '../../_services/index';
import { Execution } from 'app/_models';

@Component({
  selector: 'sprova-execution-edit',
  templateUrl: './execution-edit.component.html',
  styleUrls: ['./execution-edit.component.scss']
})
export class ExecutionEditComponent extends GenericForm implements OnInit {
  public executionId: any;
  public projectId: any;
  public model: any;
  public form: FormGroup;

  editMode = false;
  submitted = false;
  loading = true;

  constructor(
    private executionService: ExecutionService,
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
        this.projectId = params.projectId;
        this.executionId = params.executionId;
        this.editMode = true;
        if (this.executionId) {
          this.executionService.fetchOne(this.executionId).subscribe(result => {
            this.model = result;
            this.form = this.getFormGroup(this.model);
            this.loading = false;
          });
        } else {
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
    this.executionService.update(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openExecution(this.projectId, this.model._id);
      }, error => {
        this.submitted = false;
      })
  }

  addNew() {
    this.executionService.push(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openExecution(this.projectId, result._id);
      }, error => {
        this.submitted = false;
      })
  }

  getFormGroup(data?: any): FormGroup {
    return new FormGroup({
      _id: new FormControl(data ? data._id : undefined),
      title: new FormControl(data ? data.title : '', Validators.required),
      description: new FormControl(data ? data.description : '', Validators.required),
      projectId: new FormControl(data ? data.projectId : ''),
      status: new FormControl(data ? data.status : 'active')
    });
  }

}