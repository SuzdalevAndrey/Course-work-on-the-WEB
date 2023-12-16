import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

export class AuthService{
    user!:User;

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

    getCurrentUser(){
      const userDataString = localStorage.getItem('email');
      if (userDataString !== null)
        this.user = JSON.parse(userDataString);
      return this.user;
    }

    logout() {
      localStorage.removeItem('isLoggedIn');
      this.isLoggedInSubject.next(false);
    }
}