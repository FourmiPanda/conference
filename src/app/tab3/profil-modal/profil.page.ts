import { Component, OnInit, Input } from '@angular/core';
import { speaker } from '../../shared/model/presentateur.model';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'speaker-profil',
    templateUrl: 'profil.page.html',
    styleUrls: ['profil.page.css']
})

export class ProfilPage implements OnInit {

    @Input() speaker: speaker;
    apiUrl: string = environment.api.devfestimage.url;

    constructor(private modalController: ModalController) { }

    ngOnInit(): void {
        console.log("load");
    }

    closeProfil() {
        this.modalController.dismiss({
            dismissed: true
        })
    }
}