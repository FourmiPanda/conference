import { Component, OnInit } from '@angular/core';
import { Presentateur } from '../shared/model/presentateur.model';
import { PresentateurService } from '../webservices/presentateur.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {

  apiUrl: string = environment.api.devfestimage.url + "/";
  presentateurs: Presentateur[];

  constructor(private presentateurService: PresentateurService) {
  }

  ngOnInit(): void {
    this.presentateurService.getPresentateurs().subscribe((presentateurs) => {
      this.presentateurs = presentateurs;
    }, (err) => {
      console.log(err);
    });
  }
}