import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestCaseService } from './testcase.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestCaseService],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should be created', () => {
    const service: TestCaseService = TestBed.get(TestCaseService);
    expect(service).toBeTruthy();
  });
});
