import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import { Incident } from '../shared/incident.model';
import { IncidentService } from '../shared/incident.service';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
  selector: 'app-incident-search',
  templateUrl: './incident-search.component.html',
  styleUrls: ['./incident-search.component.css']
})
export class IncidentSearchComponent implements OnInit {
  placeholder: string = "Search incidents...";
  
  constructor(private incidentService: IncidentService,
    private router: Router) { }

  ngOnInit() {
  }

  search = (text$: Observable<string>) => {
    return text$.debounceTime(250)
      .distinctUntilChanged()
      // .do(() => this.searching = true)
      .switchMap(term => this.incidentService.retrieveByFilter(`id=^${term}`).map(incidents => incidents.map(incident => incident.id)));
      // .do(() => this.searching = false);
  }

  onSelectItem($event: NgbTypeaheadSelectItemEvent) {
    this.router.navigate([`/incidents/${$event.item}`]);
  }
}
