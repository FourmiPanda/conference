import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../../shared/model/session.model';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-session-details-modal',
  templateUrl: './session-details-modal.component.html',
  styleUrls: ['./session-details-modal.component.scss'],
})
export class SessionDetailsModalComponent {

  @Input() session: Session;

  constructor(private modalCtrl: ModalController) { }

  dismiss() {
    console.log(this.session);
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
