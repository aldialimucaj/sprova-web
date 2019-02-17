import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ExecutionService } from './execution.service';
import { HttpClientModule } from '@angular/common/http';

describe('ExecutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExecutionService],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should be created', inject([ExecutionService], (service: ExecutionService) => {
    expect(service).toBeTruthy();
  }));
});
