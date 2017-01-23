import { Account } from '../../account/models/account';
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