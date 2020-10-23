import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Device } = Plugins;

@Component({
  selector: 'app-phone-details-modal',
  templateUrl: './phone-details-modal.component.html',
  styleUrls: ['./phone-details-modal.component.scss'],
})
export class PhoneDetailsModalComponent implements OnInit {

  phoneDetails = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    Device.getInfo().then((res) => {
      for (const attr in res) {
        if (!res.hasOwnProperty(attr)) {continue; }
        this.phoneDetails.push({
          name: attr,
          value: res[attr]
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
