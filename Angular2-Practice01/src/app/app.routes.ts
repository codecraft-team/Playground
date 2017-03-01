import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { IncidentDetailComponent } from './incidents/incident-detail/incident-detail.component';
import { IncidentListComponent } from './incidents/incident-list/incident-list.component';

export const AppRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "incidents",
    component: IncidentsComponent,
    children: [
      {
        path: ":id",
        component: IncidentDetailComponent
      },
      {
        path: "",
        component: IncidentListComponent
      }
    ]
  }
]; 