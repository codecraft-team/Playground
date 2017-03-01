import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Announcement } from './home/announcements/announcements.model';
import { Incident } from './incidents/shared/incident.model';

export class TestData implements InMemoryDbService {
    createDb() {
        console.log("TestData.createdb");

        let announcements = [
            new Announcement("Server Restart in IT department", "Please save your work and shutdown the virtual machines. The servers will be restarted at 23:00. Every unsaved information will be lost.", new Date(2017,3,10,23,0)),
            new Announcement("Software Update", "Please save your work and start the update service.", new Date(2017,3,14,16,30)),
            new Announcement("Hardware Update", "Mollit eiusmod nostrud dolore duis proident tempor ipsum consequat.", new Date(2017,3,15,10,0))
        ];

        let incidents = [
            new Incident("IR12370", "Amet consectetur laboris aute id", "Duis irure sunt nostrud ad do. Est Lorem qui sint veniam deserunt. Tempor incididunt incididunt cillum non ad minim ipsum aute proident et pariatur.", "Dave Clark", "In Progress"),
            new Incident("IR2370", "Enim minim pariatur consequat laboris cupidatat", "Duis irure sunt nostrud ad do. Est Lorem qui sint veniam deserunt. Tempor incididunt incididunt cillum non ad minim ipsum aute proident et pariatur.", "Dave Clark", "In Progress"),
            new Incident("IR37230", "Cupidatat excepteur nulla ea aliqua minim reprehenderit ", "Duis irure sunt nostrud ad do. Est Lorem qui sint veniam deserunt. Tempor incididunt incididunt cillum non ad minim ipsum aute proident et pariatur.", "Dave Clark", "In Progress"),
            new Incident("IR44630", "Aea cillum nostrud Lorem consequat duis", "Duis irure sunt nostrud ad do. Est Lorem qui sint veniam deserunt. Tempor incididunt incididunt cillum non ad minim ipsum aute proident et pariatur.", "Dave Clark", "In Progress"),
            new Incident("IR9230", "Reprehenderit sit minim irure pariatur", "Duis irure sunt nostrud ad do. Est Lorem qui sint veniam deserunt. Tempor incididunt incididunt cillum non ad minim ipsum aute proident et pariatur.", "Dave Clark", "In Progress"),
            new Incident("IR30222", "Culpa id anim incididunt fugiat magna ", "Duis irure sunt nostrud ad do. Est Lorem qui sint veniam deserunt. Tempor incididunt incididunt cillum non ad minim ipsum aute proident et pariatur.", "Dave Clark", "In Progress")
        ]

        return {
            announcements,
            incidents
        };
    }
}