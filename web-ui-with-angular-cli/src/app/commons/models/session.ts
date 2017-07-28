import { Company } from '../../account/models/company';
import { Account } from '../../account/models/account';
import { Record } from 'immutable';
import { User } from './user';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SessionStore } from '../stores/session-store';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

const SessionRecord = Record({
    account: null,
    isSecurityCheckVerified: false
});

export class Session extends SessionRecord {

    // private _user: User = null;
    private _account: Account = null;
    private _currentCompany: Company = null;
    private _accessToken: string = '';
    private _tokenExpiresAt: any = null;
    private _tokenResponse: any = null;
    private _router: Router;
    public _sessionStore: SessionStore;

    public get user(): User {
        return this._account ? this._account.user : null;
    }

    public get currentCompany(): Company {
        return this._currentCompany;
    }

    public set currentCompany(value: Company) {
        this._currentCompany = value;
    }

    public get companies(): Company[] {
        return this._account ? this._account.companies : null;
    }

    public get account(): Account {
        return this._account;
    }

    public set account(value: Account) {
        this._account = value;
    }

    // get isAuthenticated() {
    //     return this.account ? this.account.accessToken != '' ? true : false : false;
    // }
    get isAuthenticated() {
        let now = moment();
        if (this.account) {
            if (this.account.accessToken != '' && now < this.account.tokenExpiresAt) {
                return true;
            } else {
                this.logout();
                return false;
            }
        } else {
            return false;
        }
    }

    public get accessToken(): string {
        return this._accessToken;
    }

    public set accessToken(value: string) {
        this._accessToken = value;
    }

    public get tokenExpiresAt(): any {
        return this._tokenExpiresAt;
    }

    public set tokenExpiresAt(value: any) {
        this._tokenExpiresAt = value;
    }
    public get tokenResponse(): any {
        return this._tokenResponse;
    }

    public set tokenResponse(value: any) {
        this._tokenResponse = value;
    }

    logout() {
        window.location.reload();
    }


}