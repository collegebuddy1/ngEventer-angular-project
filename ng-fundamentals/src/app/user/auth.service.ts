import { Injectable } from '@angular/core';
import { IUser } from './user.modul';

@Injectable()
export class AuthService {
    _currentUser:IUser;

    get currentUser(): IUser {
        return this._currentUser;
    }

    loginUser(userName: string, password: string) {
        this._currentUser = {
            id: 1,
            userName: userName,
            firstName: 'John',
            lastName: 'Papa'
        }
    }

    isAuthenticated() {
        return !!this._currentUser;
    }

    updateCurrentUser(firstName:string, lastName:string) {
        this._currentUser.firstName = firstName;
        this._currentUser.lastName = lastName;
    }
}