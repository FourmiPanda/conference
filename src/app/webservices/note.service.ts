import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {Observable} from 'rxjs';
import {Session} from '../shared/model/session.model';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  set(sessionNumber, note) {
    Storage.set({
      key: 'note_' + sessionNumber,
      value: note
    });
  }

  get(sessionNumber): Observable<string> {
    return new Observable<string>((subscriber) => {
      Storage.get({key: 'note_' + sessionNumber}).then((result) => {
        subscriber.next(result.value);
      }).catch((err) => {
        subscriber.error(err);
      });
    });
  }

}
