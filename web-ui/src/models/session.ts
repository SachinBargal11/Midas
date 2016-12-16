import { Company } from './company';
import { Account } from './account';
import { Record } from 'immutable';
import { User } from './user';

const SessionRecord = Record({
    account: null,
    isSecurityCheckVerified: false
});

export class Session extends SessionRecord {

    // private _user: User = null;
    private _account: Account = null;

    public get user(): User {
        return this._account ? this._account.user : null;
    }

    public get company(): Company {
        return this._account ? this._account.company : null;
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


}