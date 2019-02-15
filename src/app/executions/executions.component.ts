import { Component, OnInit } from '@angular/core';
import { ExecutionService } from "../_services";
import { Execution } from 'app/_models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sprova-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss']
})
export class ExecutionsComponent implements OnInit {
  model: Execution[];
  projectId: string;
  loading = true;
  limit = 10;
  skip = 1;

  constructor(
    private route: ActivatedRoute, public executionService: ExecutionService) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;

        this.executionService.listModelsByFilter<Execution[]>(
          { projectId: this.projectId },
          this.limit, this.limit * this.skip).subscribe(data => {
            this.model = data;
            this.loading = false;
          });
      });
  }

}
