import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CycleService } from './cycle.service';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CycleService],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should be created', inject([CycleService], (service: CycleService) => {
    expect(service).toBeTruthy();
  }));
});
