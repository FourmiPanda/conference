import {Component, OnInit} from '@angular/core';
import {SessionService} from '../webservices/session.service';
import {Session} from '../shared/model/session.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  apiUrl: string = environment.api.devfestimage.url;
  sessions: Session[];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.getSessions().subscribe((sessions) => {
      this.sessions = sessions;
    }, (err) => {
      console.error(err);
    });
  }

}
