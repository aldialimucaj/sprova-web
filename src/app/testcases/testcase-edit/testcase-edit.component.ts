import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GenericForm } from '../../_utils';
import { TestCaseService, ArtifactService, NavigatorService, ProjectService } from '../../_services/index';
import { TestCase, Project, TestStep, TestCaseExtraField, ExecutionType, ArtifactType } from '../../_models';
import { findIndex } from 'lodash';

@Component({
  selector: 'sprova-testcase-edit',
  templateUrl: './testcase-edit.component.html',
  styleUrls: ['./testcase-edit.component.scss']
})
export class TestCaseEditComponent extends GenericForm implements OnInit {
  public model: any;
  public projectModel: Project;
  public testCaseId: string;
  public form: FormGroup;
  public projectId: any;
  public parentId: any;
  public testCaseExtraFields: TestCaseExtraField[];
  public extraKeys: string[] = []; // now they are all strings
  public artifactSelectMap = {};

  editMode = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private testcaseService: TestCaseService,
    private artifactService: ArtifactService,
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
        this.projectId = params.projectId;
        this.parentId = params.parentId;
        // test case exists, editing
        if (params.testCaseId && params.testCaseId !== 'new') {
          this.editMode = true;
          this.testCaseId = params.testCaseId;
          this.testcaseService.fetchOne(params.testCaseId).subscribe(
            result => {
              this.model = result;
              this.projectService.getModel(this.projectId).subscribe((projectModel: Project) => {
                this.projectModel = projectModel;
                this.testCaseExtraFields = this.projectModel.testCaseFields;
                this.extraKeys = this.testCaseExtraFields.map(o => o.key);
                this.form = this.getFormGroup(this.model);
              })
            },
            error => {
              console.error(error);
            }
          );
        } else if (params.projectId) {
          this.model = new TestCase();
          this.model.executable = true;
          this.model.projectId = params.projectId;
          this.projectService.getModel(this.projectId).subscribe((projectModel: Project) => {
            this.projectModel = projectModel;
            this.testCaseExtraFields = this.projectModel.testCaseFields;
            this.extraKeys = this.testCaseExtraFields.map(o => o.key);
            this.form = this.getFormGroup(this.model);
          })
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
    this.testcaseService.update(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openTestCase(this.projectId, this.model._id);
      }, error => {
        this.submitted = false;
      })
  }

  cancel() {
    if (this.parentId) {
      this.navigatorService.openTestCaseChildren(this.projectId, this.parentId);
    } else {
      this.navigatorService.openProject(this.projectId);
    }
  }

  addNew() {
    this.testcaseService.push(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.submitted = true;
        this.navigatorService.openTestCase(this.projectId, result._id);
      }, error => {
        this.submitted = false;
      })
  }

  get testSteps(): FormArray {
    return this.form.get('testSteps') as FormArray;
  };

  addStep() {
    let testSteps = this.form.get('testSteps') as FormArray;
    testSteps.push(this.fb.group(new TestStep()));
  }

  get extraFields(): FormArray {
    return this.form.get('extraFields') as FormArray;
  };

  filesChange(event, stepIdx) {
    let self = this;
    let fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      this.artifactService.pushWithAttachment({ projectId: this.projectId, testCaseId: this.testCaseId, artifactType: ArtifactType.TESTCASE }, fileList[i]).subscribe(data => {
        console.log(data);
        let artifacts = self.testSteps.at(stepIdx).get('artifacts');
        if (!artifacts.value) {
          artifacts.setValue([]);
        }
        artifacts.value.push({ _id: data._id });
      });
    }
  }

  deleteSelectedArtifact(field, stepIdx) {
    const artifacts = field.get('artifacts').value;
    const artifactId = this.artifactSelectMap[stepIdx];
    if (!artifactId && artifacts.length == 1) {
      // delete the first and only one
      artifacts.pop();
    } else if (artifactId && artifacts.length > 1) {
      const index = findIndex(artifacts, ['_id', artifactId]);
      artifacts.splice(index, 1);
      delete this.artifactSelectMap[stepIdx];
    }

  }
  selectedForDelete(stepIdx, artifactId) {
    this.artifactSelectMap[stepIdx] = artifactId;
  }

  triggerFileInput(event, stepIdx) {
    let new_event = new MouseEvent(event.type, event)
    document.getElementById('fileInput-' + stepIdx).dispatchEvent(new_event);
  }

  getFormGroup(data?: any): FormGroup {
    const formGroup = {
      _id: new FormControl(data ? data._id : undefined),
      title: new FormControl(data ? data.title : '', Validators.required),
      description: new FormControl(data ? data.description : '', Validators.required),
      executable: new FormControl(data ? data.executable : true, Validators.required),
      projectId: new FormControl(data ? data.projectId : ''),
      parentId: new FormControl(this.parentId ? this.parentId : data ? data.parentId : { value: null, disabled: true }),
      status: new FormControl(data ? data.status : ''),
      executionType: new FormControl(data ? data.executionType : ExecutionType.Automated),
      testSteps: new FormArray(data ? data.testSteps.map(step => {
        if (step.artifacts) {
          step.artifacts = new FormArray(step.artifacts.map(a => this.fb.group(a)));
        }
        return this.fb.group(step)
      }) : []),
      extraFields: new FormArray(this.projectModel ? this.projectModel.testCaseFields.map(field => this.fb.group(field)) : [])
    };

    this.extraKeys.forEach(key => {
      if (!data[key]) {
        data[key] = '';
      }
      formGroup[key] = new FormControl(data ? data[key] : '');
    })

    return this.fb.group(formGroup);
  }
}
