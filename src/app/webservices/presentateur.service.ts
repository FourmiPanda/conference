import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { speaker } from '../shared/model/presentateur.model';
import { map } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class PresentateurService {

    constructor(private http: HttpClient) { }

    getspeakers(): Observable<speaker[]> {
        const url = `${environment.api.devfest.url}/speakers`;

        return this.http.get(url).pipe(
            map((result) => {
                const speakers: speaker[] = [];
                for (const speaker in result) {
                    if (!result.hasOwnProperty(speaker)) { continue; }
                    speakers.push({
                        id: result[speaker].id,
                        name: result[speaker].name,
                        company: result[speaker].company,
                        companyLogo: result[speaker].companyLogo,
                        country: result[speaker].country,
                        photoUrl: result[speaker].photoUrl,
                        shortBio: result[speaker].shortBio,
                        bio: result[speaker].bio
                    });
                }

                Capacitor.Plugins.Storage.set({
                    key: 'speakers',
                    value: JSON.stringify(speakers)
                }).then((done) => {
                    return speakers;
                }).catch((err) => {
                    console.error(err)
                })
                return speakers;
            })
        );
    }

    getStoredSpeakers(): Observable<speaker[]> {
        return new Observable<speaker[]>((subscriber) => {
            Storage.get({ key: 'speaker' }).then((result) => {
                if (!result.value) { return subscriber.next([]); }
                subscriber.next(JSON.parse(result.value));
            }).catch((err) => {
                subscriber.error(err);
            });
        });
    }
}
