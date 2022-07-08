import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private message = new BehaviorSubject([]);
  sharedMessage = this.message.asObservable();
  data: any;
  constructor() { }

  nextMessage(message: any) {
    this.message.next(message);
  }
}
