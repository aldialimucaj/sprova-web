import { TestBed } from '@angular/core/testing';

import { FolderService, TestCaseService } from '.';
import { MockQueryableService } from '../_utils';

describe('FolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: TestCaseService, useClass: MockQueryableService },
    ]
  }));

  it('should be created', () => {
    const service: FolderService = TestBed.get(FolderService);
    expect(service).toBeTruthy();
  });
});
