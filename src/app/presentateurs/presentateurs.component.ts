import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'presentateurs-component',
    templateUrl: './presentateurs.component.html',
    styleUrls: ['./presentateurs.component.css']
})

export class PresentateursComponent {
    bookList = [
        {
            name: 'eXtreme Programming Explained'
        },
        {
            name: 'Clean Code'
        }
    ];

    presentateurs: Object = {}
    url = "https://devfest-nantes-2018-api.cleverapps.io/speakers"

    constructor(private http: HttpClient) {
    }

    getPresentateurs() {
        this.presentateurs = this.http.get(this.url).subscribe(res => {
            console.log(res);
        });
    }
}

export interface PresentateursResponse {
    items: {
        id: string,
        name: string
    };
}