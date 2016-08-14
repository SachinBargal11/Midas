import {Record} from 'immutable';
import {User} from './user';

const SessionRecord = Record({
    user: null
});

export class Session extends SessionRecord {

    private _user: User = null;


    public get user(): User {
        return this._user;
    }


    public set user(value: User) {
        this._user = value;
    }

    public get displayName(): string {
        return this._user.firstName + " " + this._user.lastName;
    }

    public get account_id(): number {
        return this._user.accountId;
    }


}