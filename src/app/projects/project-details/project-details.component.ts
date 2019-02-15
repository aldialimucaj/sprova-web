import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, CycleService, NavigatorService, TestCaseService } from "../../_services";

@Component({
  selector: 'sprova-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  model: any;
  cycleModel: any;
  testCaseModel: any;
  projectId: string;
  type: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public projectService: ProjectService,
    public cycleService: CycleService,
    public testCaseService: TestCaseService,
    private navigatorService: NavigatorService,
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        this.type = params.type;
        this.projectService.fetchOne(this.projectId).subscribe(data => {
          this.model = data;
          this.loading = false;
        });

        this.cycleService.listModelsByFilter({ projectId: this.projectId }, 5, 0).subscribe(data => {
          this.cycleModel = data;
          this.loading = false;
        });

        this.testCaseService.listModelsByFilter({ projectId: this.projectId }, 5, 0).subscribe(data => {
          this.testCaseModel = data;
          this.loading = false;
        });
      });

  }

  delete(id) {
    if (confirm("Are you sure you want to delete " + this.model.name)) {
      this.projectService.remove(id).subscribe(
        data => {
          this.model = data;
          this.navigatorService.showProjects();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
