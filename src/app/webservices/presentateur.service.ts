import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Presentateur } from '../shared/model/presentateur.model';
import { map } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class PresentateurService {

    constructor(private http: HttpClient) { }

    getPresentateurs(): Observable<Presentateur[]> {
        const url = `${environment.api.devfest.url}/speakers`;

        return this.http.get(url).pipe(
            map((result) => {
                const presentateurs: Presentateur[] = [];
                for (const presentateur in result) {
                    if (!result.hasOwnProperty(presentateur)) { continue; }
                    console.log(result[presentateur].photoUrl)
                    presentateurs.push({
                        id: result[presentateur].id,
                        name: result[presentateur].name,
                        company: result[presentateur].company,
                        companyLogo: result[presentateur].companyLogo,
                        country: result[presentateur].country,
                        photoUrl: result[presentateur].photoUrl,
                        shortBio: result[presentateur].shortBio,
                        bio: result[presentateur].bio
                    });
                }

                Capacitor.Plugins.Storage.set({
                    key: 'presentateurs',
                    value: JSON.stringify(presentateurs)
                }).then((done) => {
                    return presentateurs;
                }).catch((err) => {
                    console.error(err)
                })
                return presentateurs;
            })
        );
    }
}
