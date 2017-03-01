import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { ServiceClient } from './shared/service-client';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TestData } from './testData';

import { HomeComponent } from './home/home.component';
import { AnnouncementsComponent } from './home/announcements/announcements.component';
import { AnnouncementsService } from './home/announcements/announcements.service';
import { RecentIncidentsComponent } from './home/recent-incidents/recent-incidents.component';

import { IncidentsComponent } from './incidents/incidents.component';
import { IncidentDetailComponent } from './incidents/incident-detail/incident-detail.component';
import { IncidentListComponent } from './incidents/incident-list/incident-list.component';
import { IncidentService } from './incidents/shared/incident.service';
import { IncidentSearchComponent } from './incidents/incident-search/incident-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnnouncementsComponent,
    RecentIncidentsComponent,
    IncidentsComponent,
    IncidentDetailComponent,
    IncidentListComponent,
    IncidentSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule.forRoot(),
    InMemoryWebApiModule.forRoot(TestData, { delay: 200 })
  ],
  providers: [
    ServiceClient,
    AnnouncementsService,
    IncidentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
