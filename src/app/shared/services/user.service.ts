import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from '../models/user.model';

@Injectable()
export class UsersService{
    user!:User;
    constructor(private http:HttpClient){}

    getUserByEmail(email:string): Observable<User|undefined>{
        return this.http.get<User[]>(`http://localhost:3000/users?email=${email}`).pipe(
            map(users => (users && users.length > 0) ? users[0] : undefined));
    }

    getUserById(id:number): Observable<User>{
        return this.http.get<User>(`http://localhost:3000/users/${id}`);
    }

    createNewUser(user: User):Observable<User> {
        return this.http.post<User>(`http://localhost:3000/users`,user).pipe(map(response=>response));
    }


    deleteUserById(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/users/${id}`);
    }

    updataUser(id: number, user: User): Observable<void> {
        return this.http.put<void>(`http://localhost:3000/users/${id}`, user);
    }

    getCurrentUser(){
        const userDataString = localStorage.getItem('email');
        if (userDataString !== null)
          this.user = JSON.parse(userDataString);
        return this.user;
    }
}