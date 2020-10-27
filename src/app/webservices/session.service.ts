import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Session } from '../shared/model/session.model';
import { map } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { speaker } from '../shared/model/presentateur.model';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getSessions(): Observable<Session[]> {
    const url = `${environment.api.devfest.url}/sessions`;

    return this.http.get(url).pipe(
      map((result) => {
        const sessions: Session[] = [];
        for (const sessionId in result) {
          if (!result.hasOwnProperty(sessionId)) { continue; }
          sessions.push({
            id: result[sessionId].id,
            title: result[sessionId].title,
            titleMobile: result[sessionId].titleMobile,
            image: result[sessionId].image,
            type: result[sessionId].type,
            speakers: result[sessionId].speakers || [],
            tags: result[sessionId].tags || []
          });
        }
        Storage.set({
          key: 'sessions',
          value: JSON.stringify(sessions)
        });
        return sessions;
      })
    );
  }

  getStoredSessions(): Observable<Session[]> {
    return new Observable<Session[]>((subscriber) => {
      Storage.get({ key: 'sessions' }).then((result) => {
        if (!result.value) { return subscriber.next([]); }
        subscriber.next(JSON.parse(result.value));
      }).catch((err) => {
        subscriber.error(err);
      });
    });
  }

  getSessionsForASpeaker(idSpeaker: number): Session[] {
    this.getStoredSessions().subscribe((sessions) => {
      return sessions.filter((s) => s.speakers[0] === idSpeaker);
    }, (err) => {
      console.error(err);
      this.getStoredSessions().subscribe((sessions) => {
        return sessions.filter((s) => s.speakers[0] === idSpeaker);
      }, (storedErr) => {
        console.error(storedErr);
        return [];
      });
    });
    return [];
  }
}
