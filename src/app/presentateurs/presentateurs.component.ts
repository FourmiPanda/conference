import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Presentateur } from '../shared/model/presentateur.model';
import { PresentateurService } from '../webservices/presentateur.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'presentateurs-component',
    templateUrl: './presentateurs.component.html',
    styleUrls: ['./presentateurs.component.css']
})

export class PresentateursComponent implements OnInit {

    apiUrl: string = environment.api.devfestimage.url;
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