import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Session } from '../../shared/model/session.model';
import { IonSlides, ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { NoteService } from '../../webservices/note.service';
import { PresentateurService } from 'src/app/webservices/presentateur.service';
import { speaker } from 'src/app/shared/model/presentateur.model';

@Component({
  selector: 'app-session-details-modal',
  templateUrl: './session-details-modal.component.html',
  styleUrls: ['./session-details-modal.component.scss'],
})
export class SessionDetailsModalComponent implements OnInit {

  @Input() session: Session;

  @ViewChild('slides', { static: true }) slides: IonSlides;


  apiUrl: string = environment.api.devfestimage.url + "/";

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  note: string;

  projectedSpeakers: Object[] = [];

  constructor(private modalCtrl: ModalController, private noteService: NoteService, private presentateurservice: PresentateurService) { }

  ngOnInit(): void {
    this.noteService.get(this.session.id).subscribe((n) => {
      this.note = n;
    });
    this.session.speakers.forEach((speaker) => {
      this.presentateurservice.getSpeakerById(speaker).subscribe((s) => {
        this.projectedSpeakers.push(s);
      });
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  showNotes() {
    this.slides.slideTo(1);
  }

  updateNote(event) {
    this.noteService.set(this.session.id, event.target.value);
  }
}
