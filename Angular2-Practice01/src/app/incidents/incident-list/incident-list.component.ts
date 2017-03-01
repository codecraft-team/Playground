import { Component, OnInit } from '@angular/core';

import { Incident } from '../shared/incident.model';
import { IncidentService } from '../shared/incident.service';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  private incidents: Incident[];

  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
    this.incidentService.retrieve().subscribe(incidents => this.incidents = incidents);
  }
}