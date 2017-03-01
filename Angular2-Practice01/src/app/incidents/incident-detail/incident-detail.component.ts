import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Incident } from '../shared/incident.model';
import { IncidentService } from '../shared/incident.service';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  incidentId: string;
  incident: Incident;
  incidentStatuses: Array<string> = ["New", "Active", "In Progress", "Completed", "Closed"];
  submitted: boolean = false;
  
  constructor(private route: ActivatedRoute,
    private incidentService: IncidentService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.incidentId = params["id"];
    });

    this.retrieveIncident();
  }

  retrieveIncident() {
    this.incidentService.retrieveById(this.incidentId).subscribe(incident => this.incident = incident[0]);
  }

  saveChanges() {
    console.log("Changes saved.");
  }

  onSubmit() {
    console.log("OnSubmit");
    this.submitted = true;
  }
}