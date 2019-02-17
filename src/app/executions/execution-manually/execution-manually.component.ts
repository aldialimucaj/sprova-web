import { Component, OnInit, HostListener, ChangeDetectorRef, AfterViewChecked, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigatorService, ExecutionService, TestSetService, ArtifactService } from '../../_services/index';
import { Execution, ExecutionStatus, TestStepStatus, TestStep, ExecutionType } from '../../_models';
import { TestCaseService } from '../../_services/testcase.service';
import { findIndex, find } from 'lodash';
import { UploadFile, UploadEvent } from 'ngx-file-drop';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'sprova-execution-manually',
  templateUrl: './execution-manually.component.html',
  styleUrls: ['./execution-manually.component.scss']
})
export class ExecutionManuallyComponent implements OnInit {

  @Input() execution: Execution;

  @Input() cycleId: string;
  projectId: string;

  previewFile: string;
  chart: Chart;

  loading = true;

  public files: UploadFile[] = [];

  constructor(
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private executionService: ExecutionService,
    public navigatorService: NavigatorService,
    private artifactService: ArtifactService,
    public testCaseService: TestCaseService
  ) { }

  ngOnInit() {

  }



  /**
   * Check if the form should be disabled. 
   * A form should disable all controls if a test if finished. Which occurs when a test
   * has reached its end status i.e. successful or failed
   */
  isFormDisabled(): boolean {
    let isEndStatus = (this.execution.status === ExecutionStatus.Failed) || (this.execution.status === ExecutionStatus.Successful)

    return isEndStatus;
  }

  /**
   * A test should be disabled if its previous sibling has status pending.
   * @param stepIdx Step index in the test step array
   */
  isStepDisabled(stepIdx): boolean {
    let lastPending = findIndex(this.execution.testSteps, s => s.status === TestStepStatus.Pending);

    return stepIdx !== lastPending || this.isFormDisabled();
  }

  /**
   * Returns current step to be executed.
   */
  get currentStep(): TestStep {
    let currentStep = find(this.execution.testSteps, s => s.status === TestStepStatus.Pending);
    if (currentStep && !currentStep.artifacts) { currentStep.artifacts = []; }
    return currentStep;
  }

  /**
   * Returns current step to be executed.
   */
  get currentStepIndex(): number {
    return findIndex(this.execution.testSteps, s => s.status === TestStepStatus.Pending);
  }

  pass() {
    this.updateExecution(ExecutionStatus.Successful).subscribe(executionResult => {
      // this.navigatorService.openExecution(this.execution._id);
    });
  }

  fail() {
    this.updateExecution(ExecutionStatus.Failed).subscribe(executionResult => {
      // this.navigatorService.openExecution(this.execution._id);
    });
  }

  passStep(index) {
    let step = this.execution.testSteps[index];
    step.status = TestStepStatus.Successful;
    // if this is the last step then the whole test was successful
    if (index === this.execution.testSteps.length - 1) {
      this.pass();
    } else {
      this.executionService.passStep(this.execution._id, index, step).subscribe(data => {
        // no action necessary
      }, error => {
        console.error(error);
      });
      // if the execution was pending then this is the sign it stared executing
      if (this.execution.status === ExecutionStatus.Pending) {
        this.updateExecution(ExecutionStatus.Working).subscribe(data => {
        }, error => {
          console.error(error);
        })
      }
    }
  }

  failStep(index) {
    let step = this.execution.testSteps[index];
    step.status = TestStepStatus.Failed;
    this.fail();
  }


  updateExecution(status: ExecutionStatus) {
    this.execution.status = status;
    return this.executionService.updateModel(this.execution);
  }

  filesChange(event, stepIdx) {
    let fileList: FileList = event.target.files;
    this.executionService.uploadFiles(this.execution._id, stepIdx, fileList).subscribe(data => {
      console.log(data);
    });
  }

  triggerFileInput(event, stepIdx) {
    let new_event = new MouseEvent(event.type, event)
    document.getElementById('fileInput-' + stepIdx).dispatchEvent(new_event);
  }

  dowload(artifact) {
    this.artifactService.downloadArtifact(artifact._id);
  }


  public dropped(event: UploadEvent) {
    this.files = event.files;
    const self = this;
    for (let file of event.files) {
      // file.fileEntry.file(fileIO => {
      //   this.executionService.uploadFiles(this.execution._id, String(this.currentStepIndex), [fileIO]).subscribe(data => {
      //     console.log(fileIO);
      //     console.log(data['files']);
      //     this.currentStep.artifacts = this.currentStep.artifacts.concat(data['files']);
      //     self.ref.detectChanges();
      //   });
      // });
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public getImageFullPath(fileIdx) {
    return environment.API_URL + '/' + this.currentStep.artifacts[fileIdx].fullPath;
  }

  @HostListener('window:beforeunload', ['$event'])
  checkExecutionStatus(e) {
    if (this.execution.status === 'PENDING' || this.execution.status === 'WORKING') {
      return 'Execution not completed';
    }
  }

  getStepsFullfilled() {
    let result = 0;
    const stepsLength = this.execution.testSteps.length;
    const stepsPending = this.execution.testSteps.map(v => {
      if (v.status === TestStepStatus.Pending) {
        return 1;
      } else {
        return 0;
      }
    }).reduce((f, g) => {
      return f + g;
    }, 0);

    result = Math.abs((stepsPending / stepsLength) - 1) * 100;

    return result;
  }
}
export enum GroupType {
  Single,
  Cycle,
  Set
}
