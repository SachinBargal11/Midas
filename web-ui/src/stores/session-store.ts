import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthenticationService} from '../services/authentication-service';
import {User} from '../models/user';
import {Session} from '../models/session';

@Injectable()
export class SessionStore {

    private _session: Session = new Session();

    private __USER_STORAGE_KEY__ = 'logged_user';

    public get session(): Session {
        return this._session;
    }

    constructor(private _authenticationService: AuthenticationService) {
    }

    isAuthenticated() {
        return this.session.user ? true : false;
    }

    authenticate() {

        let promise = new Promise((resolve, reject) => {

            let storedUser = window.localStorage.getItem(this.__USER_STORAGE_KEY__);

            if (storedUser) {
                let user = new User(JSON.parse(storedUser));

                this._populateSession(user);

                resolve(this._session);
            }
            else {
                reject(new Error('SAVED_AUTHENTICATION_NOT_FOUND'));
            }
        });

        return Observable.from(promise);
    }

    login(userId, password) {
        let promise = new Promise((resolve, reject) => {
            this._authenticationService.authenticate(userId, password).subscribe((user: User) => {

                this._populateSession(user);

                resolve(this._session);

            }, (error) => {
                reject(error);
            });
        });
        return Observable.from(promise);
    }

    logout() {
        this._resetSession();
        window.localStorage.removeItem(this.__USER_STORAGE_KEY__);
    }

    private _populateSession(user) {
        this._session.user = user;
        window.localStorage.setItem(this.__USER_STORAGE_KEY__, JSON.stringify(user.toJS()));
    }

    private _resetSession() {
        this.session.user = null;
    }
}