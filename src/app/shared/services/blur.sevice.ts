import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlurService {
  private isBlurredSubject = new BehaviorSubject<boolean>(false);

  isBlurred$ = this.isBlurredSubject.asObservable();

  setBlurState(isBlurred: boolean) {
    this.isBlurredSubject.next(isBlurred);
  }
}