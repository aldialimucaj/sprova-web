import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { GenericForm } from '../../_utils';
import { CycleService, NavigatorService, ProjectService } from '../../_services/index';
import { Cycle, TestCase, Project, CycleExtraField, CycleStatus } from 'app/_models';
import { TestCaseService } from 'app/_services/testcase.service';
import { remove } from 'lodash';
import { SelectionViewType } from 'app/testcases/testcase-selection/testcase-selection.component';

@Component({
  selector: 'sprova-cycle-edit',
  templateUrl: './cycle-edit.component.html',
  styleUrls: ['./cycle-edit.component.scss']
})
export class CycleEditComponent extends GenericForm implements OnInit {
  public model: Cycle;
  public form: FormGroup;
  public projectModel: Project;
  public cycleExtraFields: CycleExtraField[];
  public extraKeys: string[] = []; // now they are all strings
  public statusTypes = Object.keys(CycleStatus);

  public projectId: string;

  testCasesLoading = true;
  testCases: TestCase[];
  allProjectTestCases: TestCase[];
  selectedTestCases: TestCase[] = [];
  viewType: SelectionViewType = SelectionViewType.Grid;

  editMode = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cycleService: CycleService,
    private projectService: ProjectService,
    private navigatorService: NavigatorService,
    private route: ActivatedRoute,
    public testCaseService: TestCaseService
  ) {
    super();
    this.form = this.getFormGroup();
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        if (params.cycleId && params.cycleId !== 'new') {
          this.editMode = true;
          this.cycleService.fetchOne(params.cycleId).subscribe(
            result => {
              this.model = result;
              this.projectId = this.model.projectId;
              this.testCaseService.listModelsByFilter<TestCase[]>(
                { projectId: this.projectId }
                , 0, 0).pipe(mergeMap(testCaseData => {
                  this.testCases = testCaseData;
                  this.testCasesLoading = false;
                  this.selectedTestCases = this.testCases.filter(t => this.model.testCases.includes(t._id));
                  return this.projectService.getModel(this.projectId)
                })).subscribe((projectModel: Project) => {
                  this.projectModel = projectModel;
                  this.cycleExtraFields = this.projectModel.cycleFields;
                  this.extraKeys = this.cycleExtraFields.map(o => o.key);
                  this.form = this.getFormGroup(this.model);
                })

            },
            error => {
              console.error(error);
            }
          );
        } else if (params.projectId) {
          this.projectId = params.projectId;
          this.model = new Cycle();
          this.model.projectId = params.projectId;
          this.testCaseService.listModelsByFilter<TestCase[]>({ projectId: this.projectId }, 0, 0).pipe(mergeMap(testCaseData => {
            this.testCases = testCaseData;
            this.testCasesLoading = false;
            return this.projectService.getModel(this.projectId)
          })).subscribe((projectModel: Project) => {
            this.projectModel = projectModel;
            this.cycleExtraFields = this.projectModel.cycleFields;
            this.extraKeys = this.cycleExtraFields.map(o => o.key);
            this.form = this.getFormGroup(this.model);
          })
        }

      });
  }
  onSubmit() {
    this.form.value.testCases = this.selectedTestCases.map(testCase => testCase._id);
    if (this.editMode) {
      this.update();
    } else {
      this.addNew();
    }
  }

  update() {
    this.cycleService.update(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openCycle(this.projectId, this.model._id);
      }, error => {
        this.submitted = false;
      })
  }

  addNew() {
    this.cycleService.push(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openCycle(this.projectId, result._id);
      }, error => {
        this.submitted = false;
      })
  }

  get extraFields(): FormArray {
    return this.form.get('extraFields') as FormArray;
  };

  getFormGroup(data?: any): FormGroup {
    const formGroup = {
      _id: new FormControl(data ? data._id : undefined),
      title: new FormControl(data ? data.title : '', Validators.required),
      description: new FormControl(data ? data.description : '', Validators.required),
      remarks: new FormControl(data ? data.remarks : {}),
      projectId: new FormControl(data ? data.projectId : ''),
      testCases: new FormControl(data ? data.testCases : new Array(0)),
      status: new FormControl(data ? data.status : 'Active'),
      extraFields: new FormArray(this.projectModel ? this.projectModel.cycleFields.map(field => this.fb.group(field)) : [])
    }
    this.extraKeys.forEach(key => {
      if (!data[key]) {
        data[key] = '';
      }
      formGroup[key] = new FormControl(data ? data[key] : '');
    })
    return this.fb.group(formGroup);
  }

  cancel() {
    if (this.model && this.model._id) {
      this.navigatorService.openCycle(this.projectId, this.model._id);
    } else {
      this.navigatorService.openProject(this.model.projectId);
    }
  }
}
