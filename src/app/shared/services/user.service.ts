import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'


import { User } from '../models/user.model';
import { UrlSegment } from '@angular/router';

@Injectable()
export class UsersService{
    constructor(private http:HttpClient){}

    getUserByEmail(email:string): Observable<User|undefined>{
        return this.http.get<User[]>(`http://localhost:3000/users?email=${email}`).pipe(
            map(users => (users && users.length > 0) ? users[0] : undefined));

    }


    createNewUser(user: User):Observable<User> {
        return this.http.post<User>(`http://localhost:3000/users`,user).pipe(map(response=>response));
    }


    deleteUserById(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/users/${id}`);
    }

    changePassword(id: number, user: User): Observable<void> {
        return this.http.patch<void>(`http://localhost:3000/users/${id}`, user);
    }
}