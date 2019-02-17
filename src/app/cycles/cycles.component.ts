import { Component, OnInit } from '@angular/core';
import { CycleService } from '../_services';
import { Cycle } from 'app/_models';

@Component({
  selector: 'sprova-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.scss']
})
export class CyclesComponent implements OnInit {
  model: Cycle[];
  loading = true;

  constructor(public cycleService: CycleService) { }

  ngOnInit() {
    this.cycleService.listModels<Cycle[]>(0, 0).subscribe(data => {
      this.model = data;
      this.loading = false;
    });
  }

}
