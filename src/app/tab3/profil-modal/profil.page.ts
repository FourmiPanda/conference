import { Component, OnInit, Input } from '@angular/core';
import { speaker } from '../../shared/model/presentateur.model';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Session } from '../../shared/model/session.model';
import { SessionService } from '../../webservices/session.service';

@Component({
    selector: 'speaker-profil',
    templateUrl: 'profil.page.html',
    styleUrls: ['profil.page.css']
})

export class ProfilPage implements OnInit {

    @Input() speaker: speaker;
    apiUrl: string = environment.api.devfestimage.url + "/";
    sessions: Session[];

    constructor(private sessionService: SessionService, private modalController: ModalController) { }

    ngOnInit(): void {
        this.sessionService.getStoredSessions().subscribe((sessions) => {
            this.sessions = sessions.filter((s) => s.speakers[0] === this.speaker.id);
        }, (err) => {
            console.error(err);
            this.sessionService.getStoredSessions().subscribe((sessions) => {
                this.sessions = sessions.filter((s) => s.speakers[0] === this.speaker.id);
            }, (storedErr) => {
                console.error(storedErr);
                this.sessions = [];
            });
        });
    }

    closeProfil() {
        this.modalController.dismiss({
            dismissed: true
        })
    }
}