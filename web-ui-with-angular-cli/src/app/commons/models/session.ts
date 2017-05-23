import { Company } from '../../account/models/company';
import { Account } from '../../account/models/account';
import { Record } from 'immutable';
import { User } from './user';

const SessionRecord = Record({
    account: null,
    isSecurityCheckVerified: false,
    access_token: ''
});

export class Session extends SessionRecord {

    // private _user: User = null;
    private _account: Account = null;
    private _currentCompany: Company = null;
    private _access_token: string = '';

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

    get isAuthenticated() {
        return this.account ? true : false;
    }

    public get access_token(): string {
        return this._access_token;
    }

    public set access_token(value: string) {
        this._access_token = value;
    }


}