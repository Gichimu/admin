import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = 'http://localhost:3000/api';
  constructor(private readonly http: HttpClient) {}

  getKids(): Observable<any> {
    return this.http.get(this.url);
  }

  addKid(data: object): Observable<any> {
    return this.http.post(this.url + '/add', data);
  }

  getToken() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return this.http.post(this.url + '/token', user.userId);
    } catch (err) {
      return err.status;
    }
  }

  // getPics(): Observable<any> {
  //   return this.http.get(this.url + 'albums/1/photos').pipe();
  // }
}
