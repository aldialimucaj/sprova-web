import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExecutionService, NavigatorService, ArtifactService } from "../../_services";

import { environment } from '../../../environments/environment';
import { flatMap } from 'rxjs/operators';
import { Artifact, ArtifactType, TestStep } from '../../_models';

@Component({
  selector: 'sprova-execution-details',
  templateUrl: './execution-details.component.html',
  styleUrls: ['./execution-details.component.scss']
})
export class ExecutionDetailsComponent implements OnInit {
  model: any;
  id: string;
  projectId: string;
  artifacts: Artifact[];

  type: string;
  loading = true;
  environment = environment;

  artifactType = ArtifactType;

  constructor(
    private route: ActivatedRoute,
    private navigatorService: NavigatorService,
    public executionService: ExecutionService,
    public artifactService: ArtifactService
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.id = params.executionId;
        this.projectId = params.projectId;
        this.type = params.type;
        this.executionService.fetchOne(this.id).pipe(flatMap(data => {
          this.model = data;
          this.loading = false;
          return this.artifactService.listModelsByFilter<Artifact[]>({ executionId: this.model._id });
        })).subscribe(artifacts => {
          this.artifacts = artifacts;
        }
        );
      });
  }

  reRun(id) {
    if (confirm("Are you sure you want to re-run this execution. Current status will be lost!")) {
      this.executionService.reExecute(id).subscribe(
        data => {
          this.navigatorService.reexecutionTestCase(this.projectId, this.model.cycleId, this.model.testCaseId, this.id);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  delete(id) {
    if (confirm("Are you sure you want to delete " + this.model.name)) {
      this.executionService.remove(id).subscribe(
        data => {
          this.model = data;
          this.navigatorService.showExecutions();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getArtifacts() {
    return this.model.testSteps.map(element => element.artifacts).flat();
  }

}
