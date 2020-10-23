import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Session} from '../shared/model/session.model';
import {map} from 'rxjs/operators';

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
              tags: result[sessionId].tags || []
            });
          }
          return sessions;
        })
    );
  }
}
