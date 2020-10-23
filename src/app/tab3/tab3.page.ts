import { Component, OnInit } from '@angular/core';
import { speaker } from '../shared/model/presentateur.model';
import { PresentateurService } from '../webservices/presentateur.service';
import { environment } from '../../environments/environment';
import { ProfilPage } from './profil-modal/profil.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {

  apiUrl: string = environment.api.devfestimage.url + "/";
  speakers: speaker[];

  constructor(private speakerService: PresentateurService, public modalController: ModalController) {
  }

  ngOnInit(): void {
    this.speakerService.getspeakers().subscribe((speakers) => {
      this.speakers = speakers;
    }, (err) => {
      console.error(err);
      this.speakerService.getStoredSpeakers().subscribe((speakers) => {
        this.speakers = speakers;
      }, (storedErr) => {
        console.error(storedErr);
      });
    });
  }

  async showProfil(speaker: speaker) {
    const modal = await this.modalController.create({
      component: ProfilPage,
      componentProps: {
        speaker
      }
    });
    return await modal.present();
  }
}