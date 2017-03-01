import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ServiceClient } from '../../shared/service-client';
import { Announcement } from './announcements.model';

@Injectable()
export class AnnouncementsService {
  private announcementsUrl = "announcements";  

  constructor(private serviceClient: ServiceClient){

  }

  retrieve() : Observable<Announcement[]> {
    return this.serviceClient.get(this.announcementsUrl);
  }
}