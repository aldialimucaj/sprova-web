import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { camelCase } from 'lodash';
import { GenericForm } from '../../_utils';
import { ProjectService, NavigatorService } from '../../_services/index';
import { Project, CycleExtraField, TestCaseExtraField} from '../../_models';

@Component({
  selector: 'sprova-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent extends GenericForm implements OnInit {
  public model: Project;
  public form: FormGroup;
  public types = ['String'] // TODO: Read dynamically

  editMode = false;
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
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
        if (params.projectId) {
          this.editMode = true;
          this.projectService.fetchOne(params.projectId).subscribe(
            result => {
              this.model = result;
              this.form = this.getFormGroup(this.model);
              this.loading = false;
            },
            error => {
              console.error(error);
            }
          );
        } else {
          this.model = new Project();
          this.form = this.getFormGroup(this.model);
          this.loading = false;
        }
      });
  }
  onSubmit() {
    this.checkExtraFields();

    if (this.editMode) {
      this.update();
    } else {
      this.addNew();
    }
  }

  update() {
    this.projectService.update(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openProject(this.model._id);
      }, error => {
        this.submitted = false;
      })
  }

  addNew() {
    this.projectService.push(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openProject(result._id);
      }, error => {
        this.submitted = false;
      })
  }

  addExtraCycleField() {
    let cycleFields = this.form.get('cycleFields') as FormArray;
    cycleFields.push(this.fb.group(new CycleExtraField()));
  }

  removeExtraCycleField(index: number) {
    let cycleFields = this.form.get('cycleFields') as FormArray;
    cycleFields.removeAt(index);
  }

  addExtraTestCaseField() {
    let testCaseFields = this.form.get('testCaseFields') as FormArray;
    testCaseFields.push(this.fb.group(new TestCaseExtraField()));
  }

  removeExtraTestCaseField(index: number) {
    let testCaseFields = this.form.get('testCaseFields') as FormArray;
    testCaseFields.removeAt(index);
  }

  checkExtraFields() {
    let cycleFields = this.form.get('cycleFields') as FormArray;
    let testCaseFields = this.form.get('testCaseFields') as FormArray;

    let cleanUp = (fields, cleaner) => {
      let fieldsLenght = fields.controls.length;
      for(let fieldIndex = 0; fieldIndex < fieldsLenght; fieldIndex ++) {
        let field = fields.controls[fieldIndex];
        if(field){
          if(!field.value || !field.value.key) {
            cleaner(fieldIndex);
            fieldIndex--;
            fieldsLenght--;
          }
        }
      }
    }

    cleanUp(cycleFields, this.removeExtraCycleField.bind(this));
    cleanUp(testCaseFields, this.removeExtraTestCaseField.bind(this));
  }

  get cycleFields(): FormArray {
    return this.form.get('cycleFields') as FormArray;
  };

  get testCaseFields(): FormArray {
    return this.form.get('testCaseFields') as FormArray;
  };

  updateFieldKey(field) {
    let title = field.get('title').value;
    field.get('key').setValue(camelCase(title));
  }

  getFormGroup(data?: any): FormGroup {
    return this.fb.group({
      _id: new FormControl(data ? data._id : undefined),
      title: new FormControl(data ? data.title : '', Validators.required),
      description: new FormControl(data ? data.description : '', Validators.required),
      status: new FormControl(data ? data.status : 'active'),
      cycleFields: new FormArray(data ? data.cycleFields.map(field => this.fb.group(field)) : []),
      testCaseFields: new FormArray(data ? data.testCaseFields.map(field => this.fb.group(field)) : [])
    });
  }
}
