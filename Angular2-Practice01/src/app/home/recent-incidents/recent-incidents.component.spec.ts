/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { IncidentService } from '../../incidents/shared/incident.service';

import { ServiceClient } from '../../shared/service-client';
import { RecentIncidentsComponent } from './recent-incidents.component';

describe('RecentIncidentsComponent', () => {
  let component: RecentIncidentsComponent;
  let fixture: ComponentFixture<RecentIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [ RecentIncidentsComponent ],
      providers: [
        {
          provide: Http, 
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        IncidentService,
        ServiceClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
