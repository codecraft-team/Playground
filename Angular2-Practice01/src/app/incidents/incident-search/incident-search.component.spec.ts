/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbTypeaheadModule, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { ServiceClient } from '../../shared/service-client';

import { IncidentService } from '../shared/incident.service';
import { IncidentSearchComponent } from './incident-search.component';

describe('IncidentSearchComponent', () => {
  let component: IncidentSearchComponent;
  let fixture: ComponentFixture<IncidentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentSearchComponent ],
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
      ],
      imports: [
        RouterTestingModule,
        NgbTypeaheadModule 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
