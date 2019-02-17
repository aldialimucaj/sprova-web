import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { GenericForm } from '../../_utils';
import { TestSetService, CycleService, NavigatorService, ProjectService, TreeUtilsService } from '../../_services/index';
import { Cycle, TestCase, Project, CycleExtraField, CycleStatus, TestSet, TestSetExtraField } from 'app/_models';
import { TestCaseService } from '../../_services/testcase.service';
import { SelectionViewType } from 'app/testcases/testcase-selection/testcase-selection.component';

@Component({
  selector: 'sprova-testsets-edit',
  templateUrl: './testsets-edit.component.html',
  styleUrls: ['./testsets-edit.component.scss']
})
export class TestSetsEditComponent extends GenericForm implements OnInit {
  public model: TestSet;
  public cycle: Cycle;
  public form: FormGroup;
  public projectModel: Project;
  public testSetExtraFields: TestSetExtraField[];
  public extraKeys: string[] = []; // now they are all strings
  public statusTypes = Object.keys(CycleStatus);

  public projectId: string;
  public cycleId: string;

  selectedTestCases: TestCase[] = [];

  testCasesLoading = true;
  testCases: TestCase[];
  treeModel: TestCase[];
  viewType: SelectionViewType = SelectionViewType.Grid;

  editMode = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private testSetService: TestSetService,
    private cycleService: CycleService,
    private projectService: ProjectService,
    private navigatorService: NavigatorService,
    private route: ActivatedRoute,
    public testCaseService: TestCaseService,
    public treeUtilsService: TreeUtilsService
  ) {
    super();
    this.form = this.getFormGroup();
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        this.cycleId = params.cycleId;
        if (params.testSetId && params.testSetId !== 'new') {

          this.editMode = true;
          this.testSetService.fetchOne(params.testSetId).pipe(
            mergeMap(result => {
              this.model = result;
              return this.cycleService.fetchOne(this.cycleId);
            }), mergeMap(result => {
              // we need the cycle in order to filter only those test cases which are included in the cycle
              this.cycle = result;
              return this.testCaseService.listModelsByFilter<TestCase[]>({ projectId: this.projectId }, 0, 0);
            })).subscribe(testCases => {
              // test cases to be shown in the selection tree are filtered form the cycle
              this.testCases = testCases.filter(t => this.cycle.testCases.includes(t._id));
              // the treemodel is not bound by the cycle testcases because they can miss parents
              this.treeModel = this.treeUtilsService.flatToTree(testCases, [], undefined);
              this.testCasesLoading = false;
              this.selectedTestCases = this.testCases.filter(t => this.model.testCases.includes(t._id));
              this.form = this.getFormGroup(this.model);
            });

        } else if (params.projectId) {
          this.model = new TestSet();
          this.model.projectId = params.projectId;
          this.model.cycleId = params.cycleId;
          this.cycleService.getTestCases(this.cycleId, 0, 0, { updatedAt: -1 }).pipe(mergeMap(
            testCases => {
              this.testCases = testCases;
              this.testCasesLoading = false;
              this.form = this.getFormGroup(this.model);

              return this.projectService.getModel(this.projectId)
            })).subscribe((projectModel: Project) => {
              this.projectModel = projectModel;
              this.testSetExtraFields = this.projectModel.cycleFields;
              this.extraKeys = this.testSetExtraFields.map(o => o.key);
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
    this.testSetService.update(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openTestSet(this.projectId, this.cycleId, this.model._id);
      }, error => {
        this.submitted = false;
      })
  }

  addNew() {
    this.testSetService.push(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openTestSet(this.projectId, this.cycleId, result._id);
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
      projectId: new FormControl(data ? data.projectId : ''),
      cycleId: new FormControl(data ? data.cycleId : ''),
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
      this.navigatorService.openTestSet(this.projectId, this.cycleId, this.model._id);
    } else {
      this.navigatorService.openCycle(this.projectId, this.cycleId);
    }
  }
}

