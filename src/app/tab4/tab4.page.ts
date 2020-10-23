import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PhoneDetailsModalComponent} from './phone-details-modal/phone-details-modal.component';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(public modalController: ModalController) {}

  async openPhoneDetails() {
    const modal = await this.modalController.create({
      component: PhoneDetailsModalComponent
    });
    return await modal.present();
  }
}
