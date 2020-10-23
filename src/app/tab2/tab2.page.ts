import {Component, OnInit} from '@angular/core';
import {SessionService} from '../webservices/session.service';
import {Session} from '../shared/model/session.model';
import {environment} from '../../environments/environment';
import {ModalController} from '@ionic/angular';
import {SessionDetailsModalComponent} from './session-details-modal/session-details-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  apiUrl: string = environment.api.devfestimage.url;
  sessions: Session[];

  constructor(private sessionService: SessionService, public modalController: ModalController) {}

  ngOnInit(): void {
    this.sessionService.getSessions().subscribe((sessions) => {
      this.sessions = sessions;
    }, (err) => {
      console.error(err);
      this.sessionService.getStoredSessions().subscribe((sessions) => {
        this.sessions = sessions;
      }, (storedErr) => {
        console.error(storedErr);
      });
    });
  }

  async showDetails(session: Session) {
    const modal = await this.modalController.create({
      component: SessionDetailsModalComponent,
      componentProps: {
        session
      }
    });
    return await modal.present();
  }
}
