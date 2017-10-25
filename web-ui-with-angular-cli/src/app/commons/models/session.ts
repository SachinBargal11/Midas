import { Company } from '../../account/models/company';
import { Account } from '../../account/models/account';
import { Record } from 'immutable';
import { User } from './user';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { SessionStore } from '../stores/session-store';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { environment } from '../../../environments/environment';

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
    
    public get companiesWithoutCurrentCompany(): Company[] {
        if(this._account) {
            let companies: Company[];
            return companies = _.reject(this._account.companies, (currCompany: Company) => {
                return this._currentCompany.name == currCompany.name;
            }); 
        } else {
            return null;
        }
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
                let url = window.location.href;
                let host = window.location.protocol + "//" + window.location.host + '/';
                if (url != host + '' && url != host + '#/404' && url != host + '#/') {
                localStorage["currentHref"] = window.location.href;
                }
                this.getToken();
                // this.logout();
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
    getToken() {
        var authorizationUrl = `${environment.IDENTITY_SERVER_URL}` + '/core/connect/authorize';
        var redirect_uri = window.location.protocol + "//" + window.location.host + "/";
        var response_type = "id_token token";
        var scope: string = `${environment.IDENTITY_SCOPE}`;
        var client_id: string = `${environment.CLIENT_ID}`;

        var state = this.rand();
        var nonce = this.rand();
        localStorage["state"] = state;
        localStorage["nonce"] = nonce;
        var url =
            authorizationUrl + "?" +
            "client_id=" + encodeURI(client_id) + "&" +
            "redirect_uri=" + encodeURI(redirect_uri) + "&" +
            "response_type=" + encodeURI(response_type) + "&" +
            "scope=" + encodeURI(scope) + "&" +
            "state=" + encodeURI(state) + "&" +
            "nonce=" + encodeURI(nonce);
        url;
        localStorage["url"] = url;
        window.location.assign(url);
    }
    rand() {
        return (Date.now() + "" + Math.random()).replace(".", "");
    }


}