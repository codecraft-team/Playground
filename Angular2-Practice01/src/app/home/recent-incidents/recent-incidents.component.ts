import { Component, OnInit } from '@angular/core';

import { Incident } from '../../incidents/shared/incident.model';
import { IncidentService } from '../../incidents/shared/incident.service';

@Component({
  selector: 'app-recent-incidents',
  templateUrl: './recent-incidents.component.html',
  styleUrls: ['./recent-incidents.component.css']
})
export class RecentIncidentsComponent implements OnInit {
  private recentIncidents: Incident[] = [];

  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
    this.incidentService.retrieveRecent().subscribe(recentIncidents => this.recentIncidents = recentIncidents);
  }
}
