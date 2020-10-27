import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Plugins} from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }


  set(sessionNumber, photo, cb) {
    Storage.set({
      key: 'photo_' + sessionNumber,
      value: photo
    }).then(cb).catch((err) => {
      console.log(err);
    });
  }

  get(sessionNumber): Observable<string> {
    return new Observable<string>((subscriber) => {
      Storage.get({key: 'photo_' + sessionNumber}).then((result) => {
        subscriber.next(result.value);
      }).catch((err) => {
        subscriber.error(err);
      });
    });
  }


}
