import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ServiceClient } from '../../shared/service-client';
import { Incident } from './incident.model';

@Injectable()
export class IncidentService {
  private incidentApiUrl = "incidents";
  
  constructor(private serviceClient: ServiceClient) { 

  }

  retrieve(): Observable<Incident[]> {
    return this.serviceClient.get(this.incidentApiUrl);
  }

  retrieveById(incidentId: string): Observable<Incident> {
    return this.serviceClient.get(`${this.incidentApiUrl}?id=${incidentId}`);
  }

  retrieveByFilter(filter: string): Observable<Incident[]> {
    return this.serviceClient.get(`${this.incidentApiUrl}?${filter}`);
  }

  retrieveRecent(): Observable<Incident[]> {
    return this.serviceClient.get(`${this.incidentApiUrl}?id=^IR3`);
  }
}