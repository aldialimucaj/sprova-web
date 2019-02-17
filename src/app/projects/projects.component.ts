import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../_services";
import { Project } from '../_models';

@Component({
  selector: 'sprova-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  model: Project[];
  loading = true;

  constructor(public projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.listModels<Project[]>(0, 0).subscribe(data => {
      this.model = data;
      this.loading = false;
    });
  }

}
