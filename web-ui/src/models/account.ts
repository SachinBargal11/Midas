import {Record} from 'immutable';
import moment from 'moment';
import {AccountStatus} from './enums/AccountStatus';

const AccountRecord = Record({
    id: 0,
    name: "",
    status: AccountStatus.active,
    isDeleted: 0,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null,
    updateDate: null
});

export class Account extends AccountRecord {

    id: number;
    name: string;
    status: AccountStatus;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.MomentStatic;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }


    public get displayName(): string {
        return this.name;
    }

}