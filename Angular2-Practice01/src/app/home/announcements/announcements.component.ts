import { Component, OnInit } from '@angular/core';

import { Announcement } from './announcements.model';
import { AnnouncementsService } from './announcements.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  private announcements: Announcement[] = [];

  constructor(private announcementsService: AnnouncementsService) { }

  ngOnInit() {
    this.retrieveAnnouncements();
  }

  refresh() {
    this.retrieveAnnouncements();
  }

  private retrieveAnnouncements() {
    this.announcements = [];
    this.announcementsService.retrieve().subscribe(announcements => this.announcements = announcements);
  }
}
