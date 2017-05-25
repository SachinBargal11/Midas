import { CompanyAdapter } from '../../account/services/adapters/company-adapter';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { AuthenticationService } from '../../account/services/authentication-service';
import { User } from '../models/user';
import { Session } from '../models/session';
import { Company } from '../../account/models/company';
import { Account } from '../../account/models/account';
import { AccountAdapter } from '../../account/services/adapters/account-adapter';
import * as _ from 'underscore';

@Injectable()
export class SessionStore {

    @Output() userLogoutEvent: EventEmitter<{}> = new EventEmitter(true);
    @Output() userCompanyChangeEvent: EventEmitter<{}> = new EventEmitter(true);

    private _session: Session = new Session();

    private __ACCOUNT_STORAGE_KEY__ = 'logged_account';
    private __CURRENT_COMPANY__ = 'current_company';

    public get session(): Session {
        return this._session;
    }

    constructor(private _authenticationService: AuthenticationService) {
    }

    authenticate() {

        let promise = new Promise((resolve, reject) => {

            let storedAccount: any = window.localStorage.getItem(this.__ACCOUNT_STORAGE_KEY__);

            if (storedAccount) {
                let storedAccountData: any = JSON.parse(storedAccount);
                let account: Account = AccountAdapter.parseStoredData(storedAccountData);
                this._populateSession(account);
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
                let storedAccountData: any = JSON.parse(window.sessionStorage.getItem('logged_user_with_pending_security_review'));
                let account: Account = AccountAdapter.parseStoredData(storedAccountData);
                let pin = window.sessionStorage.getItem('pin');
                this._authenticationService.validateSecurityCode(account.user.id, securityCode, pin).subscribe(
                    (response: boolean) => {
                        window.localStorage.setItem('device_verified_for' + account.user.userName, moment().toISOString());
                        this._populateSession(account);
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
            this._authenticationService.authenticate(userId, password, forceLogin).subscribe((account: Account) => {
                if (!forceLogin) {
                    window.sessionStorage.setItem('logged_user_with_pending_security_review', JSON.stringify(account.toJS()));
                } else {
                    this._populateSession(account);
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
        window.localStorage.removeItem(this.__ACCOUNT_STORAGE_KEY__);
        window.localStorage.removeItem(this.__CURRENT_COMPANY__);
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

    private _populateSession(account: Account) {
        this._session.account = account;
        let storedCompany: any = JSON.parse(window.localStorage.getItem(this.__CURRENT_COMPANY__));
        let company: Company = CompanyAdapter.parseResponse(storedCompany);
        this._session.currentCompany = company ? company : account.companies[0];
        window.localStorage.setItem(this.__CURRENT_COMPANY__, JSON.stringify(this._session.currentCompany));
        window.localStorage.setItem(this.__ACCOUNT_STORAGE_KEY__, JSON.stringify(account.toJS()));
    }

    private _resetSession() {
        this.session.account = null;
        this.userLogoutEvent.emit(null);
    }

    selectCurrentCompany(event, companyId) {
        event.preventDefault();
        let company: Company = _.find(this.session.companies, { id: parseInt(companyId, 10) });
        this._session.currentCompany = company;
        window.localStorage.setItem(this.__CURRENT_COMPANY__, JSON.stringify(company));
        this.userCompanyChangeEvent.emit(null);
    }
    isOnlyDoctorRole() {
        let isOnlyDoctorRole: boolean = false;
        let roles = this.session.user.roles;
        if (roles) {
            if (roles.length === 1) {
                let doctorRoleOnly = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
                if (doctorRoleOnly) {
                    isOnlyDoctorRole = true;
                } else {
                    isOnlyDoctorRole = false;
                }
            } else {
                    isOnlyDoctorRole = false;
            }
        }
        return isOnlyDoctorRole;
    }
}
