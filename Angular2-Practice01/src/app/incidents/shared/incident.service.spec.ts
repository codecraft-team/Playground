/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { ServiceClient } from '../../shared/service-client';

import { IncidentService } from './incident.service';

describe('IncidentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        ServiceClient,
        IncidentService
      ]
    });
  });

  it('should ...', inject([IncidentService], (service: IncidentService) => {
    expect(service).toBeTruthy();
  }));
});
