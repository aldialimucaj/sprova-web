import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sprova-executions-grid',
  templateUrl: './executions-grid.component.html',
  styleUrls: ['./executions-grid.component.scss']
})
export class ExecutionsGridComponent implements OnInit {

  @Input() executions;
  @Input() loading;

  public projectId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
      });
  }

}
