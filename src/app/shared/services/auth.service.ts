import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

export class AuthService{
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);

    isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
    constructor() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        this.isLoggedInSubject.next(isLoggedIn === 'true');
    }
  
    login() {
      this.isLoggedInSubject.next(true);
      localStorage.setItem('isLoggedIn', 'true');
    }

    logout() {
      localStorage.removeItem('isLoggedIn');
      this.isLoggedInSubject.next(false);
    }
}