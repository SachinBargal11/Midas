import {Record} from 'immutable';
import Moment from 'moment';

const AccountRecord = Record({
    id: 0,
    name: "",
    addressID: 2,
    contactInfoID: 3,
    isDeleted: true,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: Moment(),
    updateDate: Moment()
});

export class Account extends AccountRecord {

    id: number;
    name: string;
    addressID: number;
    contactInfoID: number;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: Date;
    updateDate: Date;

    constructor(props) {
        super(props);
    }


    public get displayName(): string {
        return this.name;
    }

}