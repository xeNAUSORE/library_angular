import { TestBed } from '@angular/core/testing';

import { AuthorService } from './authors.service';

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
