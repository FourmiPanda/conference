import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../../shared/model/session.model';
import {ModalController} from '@ionic/angular';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-session-details-modal',
  templateUrl: './session-details-modal.component.html',
  styleUrls: ['./session-details-modal.component.scss'],
})
export class SessionDetailsModalComponent implements OnInit {

  @Input() session: Session;

  apiUrl: string = environment.api.devfestimage.url;

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

  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.session.speakers.forEach(() => {
      // TODO: Get speakers
    });
  }

  dismiss() {
    console.log(this.session);
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
