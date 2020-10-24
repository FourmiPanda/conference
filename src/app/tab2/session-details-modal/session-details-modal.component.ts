import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Session} from '../../shared/model/session.model';
import {IonSlides, ModalController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {NoteService} from '../../webservices/note.service';
import {CameraResultType, Plugins} from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-session-details-modal',
  templateUrl: './session-details-modal.component.html',
  styleUrls: ['./session-details-modal.component.scss'],
})
export class SessionDetailsModalComponent implements OnInit {

  @Input() session: Session;

  @ViewChild('slides', {static: true}) slides: IonSlides;


  apiUrl: string = environment.api.devfestimage.url;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  projectedSpeakers = [{
    id: 101,
    name: 'Charlie GERARD',
    featured: true,
    company: 'ThoughtWorks',
    companyLogo: '/images/logos/thoughtworks.png',
    country: 'Australia',
    photoUrl: '/images/speakers/charlie-gerard.png',
    shortBio: 'Hey I’m Charlie, currently Software Developer @ ThoughtWorks in Sydney. I am passionate about Creative Technologies, Creative Coding, Hardware and IoT.',
    bio: 'Hey I’m Charlie, currently Software Developer @ ThoughtWorks in Sydney. I am passionate about Creative Technologies, Creative Coding, Hardware and IoT. When I’m not coding for a client’s project, I am mentoring at General Assembly, building projects using Arduino and other devices, writing tutorials to share what I learn or reading news. You can also check my [portfolio](http://charliegerard.github.io) if you’d like to know more about me :).',
    tags: [
      'IoT'
    ],
    badges: [],
    socials: [
      {
        icon: 'twitter',
        name: 'Twitter',
        link: 'https://twitter.com/devdevcharlie'
      },
      {
        icon: 'github',
        name: 'Github',
        link: 'https://github.com/charliegerard'
      }
    ]
  }];

  note: string;

  constructor(private modalCtrl: ModalController, private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.get(this.session.id).subscribe((n) => {
      this.note = n;
    });
    this.session.speakers.forEach(() => {
      // TODO: Get speakers
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
      resultType: CameraResultType.Uri
    }).then((cameraPhoto) => {
      console.log(cameraPhoto);
    }).catch((err) => {
      console.error(err);
    });
  }

    pickPhoto() {

    }
}
