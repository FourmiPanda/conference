import { Component, OnInit } from '@angular/core';
import { Presentateur } from '../shared/model/presentateur.model';
import { PresentateurService } from '../webservices/presentateur.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'presentateur-profil',
    templateUrl: 'profil.page.html',
    styleUrls: ['profil.page.css']
})

export class ProfilPage implements OnInit {

    ngOnInit(): void {
        console.log("load");
    }
}