import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, CycleService, NavigatorService, TestCaseService } from "../../_services";

@Component({
  selector: 'sprova-project-cycles',
  templateUrl: './project-cycles.component.html',
  styleUrls: ['./project-cycles.component.scss']
})
export class ProjectCyclesComponent implements OnInit {
  cycleModel: any;
  loading = true;
  projectId: string;

  constructor(private route: ActivatedRoute,
    public projectService: ProjectService,
    public cycleService: CycleService,
    private navigatorService: NavigatorService) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        this.cycleService.listModelsByFilter({ projectId: this.projectId }, 0, 0).subscribe(data => {
          this.cycleModel = data;
          this.loading = false;
        });

      });
  }

}
