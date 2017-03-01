/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { ServiceClient } from '../shared/service-client';
import { IncidentService } from '../incidents/shared/incident.service';

import { HomeComponent } from './home.component';
import { Announcement } from './announcements/announcements.model';
import { AnnouncementsService } from './announcements/announcements.service';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { RecentIncidentsComponent } from './recent-incidents/recent-incidents.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, AnnouncementsComponent, RecentIncidentsComponent ],
      imports: [ RouterTestingModule ],
      providers: [ 
        {
          provide: Http, 
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        ServiceClient,
        IncidentService,
        AnnouncementsService 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
