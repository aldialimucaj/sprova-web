import { TestBed } from '@angular/core/testing';

import { TreeUtilsService } from './tree-utils.service';

describe('TreeUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeUtilsService = TestBed.get(TreeUtilsService);
    expect(service).toBeTruthy();
  });
});
