import {TestBed} from '@angular/core/testing';

import {SelectedService} from './selected.service';

describe('SelectedServiceService', () => {
  let service: SelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
