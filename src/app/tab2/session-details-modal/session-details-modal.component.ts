import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Session} from '../../shared/model/session.model';
import {IonSlides, ModalController, ToastController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {NoteService} from '../../webservices/note.service';
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import {PhotoService} from '../../webservices/photo.service';
import {PresentateurService} from '../../webservices/presentateur.service';

const { Camera } = Plugins;

@Component({
  selector: 'app-session-details-modal',
  templateUrl: './session-details-modal.component.html',
  styleUrls: ['./session-details-modal.component.scss'],
})
export class SessionDetailsModalComponent implements OnInit {

  @Input() session: Session;

  @ViewChild('slides', { static: true }) slides: IonSlides;


  apiUrl: string = environment.api.devfestimage.url;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  note: string;

  projectedSpeakers: any[] = [];

  photo: string;

  constructor(private modalCtrl: ModalController, private noteService: NoteService, private photoService: PhotoService,
              public toastController: ToastController, private presentateurservice: PresentateurService) { }

  ngOnInit(): void {
    this.noteService.get(this.session.id).subscribe((n) => {
      this.note = n;
    });
    this.session.speakers.forEach((speaker) => {
      this.presentateurservice.getSpeakerById(speaker).subscribe((s) => {
        this.projectedSpeakers.push(s);
        console.log(s);
      });
    });
    this.photoService.get(this.session.id).subscribe((res) => {
      if (!res) { return; }
      this.photo = res;
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

  takePicture() {
    Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      saveToGallery: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.DataUrl
    }).then((cameraPhoto) => {
      this.photoService.set(this.session.id, cameraPhoto.dataUrl, () => {
        this.presentToast('Picture stored !');
        this.photo = cameraPhoto.dataUrl;
      });
    }).catch((err) => {
      console.error(err);
    });
  }

    pickPhoto() {
      Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        saveToGallery: false,
        source: CameraSource.Photos,
        resultType: CameraResultType.DataUrl
      }).then((cameraPhoto) => {
        this.photoService.set(this.session.id, cameraPhoto.dataUrl, () => {
          this.presentToast('Picture stored !');
          this.photo = cameraPhoto.dataUrl;
        });
      }).catch((err) => {
        console.error(err);
      });
    }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }

}
