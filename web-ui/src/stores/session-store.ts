import { Spinner } from 'primeng';
import { debounce } from 'rxjs/operator/debounce';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import { AuthenticationService } from '../services/authentication-service';
import { User } from '../models/user';
import { Session } from '../models/session';

@Injectable()
export class SessionStore {

    @Output() userLogoutEvent: EventEmitter<{}> = new EventEmitter(true);

    private _session: Session = new Session();

    private __USER_STORAGE_KEY__ = 'logged_user';

    public get session(): Session {
        return this._session;
    }

    constructor(private _authenticationService: AuthenticationService) {
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

    verifyLoginDevice(securityCode: string) {
        let promise = new Promise((resolve, reject) => {
            if (!window.sessionStorage.getItem('logged_user_with_pending_security_review')) {
                reject(new Error('INVALID_REDIRECTION'));
            } else {
                let user: User = new User(JSON.parse(window.sessionStorage.getItem('logged_user_with_pending_security_review')));
                let pin = window.sessionStorage.getItem('pin');
                this._authenticationService.validateSecurityCode(user.id, securityCode, pin).subscribe(
                    (response: boolean) => {
                        window.localStorage.setItem('device_verified_for' + user.userName, moment().toISOString());
                        this._populateSession(user);
                        window.sessionStorage.removeItem('logged_user_with_pending_security_review');
                        resolve(this._session);
                    },
                    (error) => {
                        reject(error);
                    });
            }
        });

        return Observable.from(promise);
    }

    login(userId, password, forceLogin) {
        let promise = new Promise((resolve, reject) => {
            this._authenticationService.authenticate(userId, password, forceLogin).subscribe((user: User) => {
                if (!forceLogin) {
                    window.sessionStorage.setItem('logged_user_with_pending_security_review', JSON.stringify(user.toJS()));
                } else {
                    this._populateSession(user);
                }
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

    authenticatePassword(userName, oldpassword) {
        let promise = new Promise((resolve, reject) => {
            this._authenticationService.authenticatePassword(userName, oldpassword).subscribe((user: User) => {

                resolve(user);

            }, (error) => {
                reject(error);
            });
        });
        return Observable.from(promise);
    }

    resetDeviceVerification() {
        let promise = new Promise((resolve, reject) => {
            window.sessionStorage.removeItem('logged_user_with_pending_security_review');
            resolve(true);
        });
        return Observable.from(promise);
    }

    private _populateSession(user: User) {
        this._session.user = user;
        window.localStorage.setItem(this.__USER_STORAGE_KEY__, JSON.stringify(user.toJS()));
    }

    private _resetSession() {
        this.session.user = null;
        this.userLogoutEvent.emit(null);
    }
}