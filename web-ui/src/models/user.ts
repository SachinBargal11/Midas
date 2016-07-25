import {Record} from 'immutable';
import Moment from 'moment';

const UserRecord = Record({
    id: 0,
    userType: 1,
    accountID: 1,
    userName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: 1,
    imageLink: "",
    addressID: 7,
    contactInfoID: 8,
    dateOfBirth: Moment(),
    password: "",
    isDeleted: true,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: Moment(),
    updateDate: Moment()
});

export class User extends UserRecord {

    id: number;
    userType: number;
    accountID: number;
    userName: "";
    firstName: "";
    middleName: "";
    lastName: "";
    gender: number;
    imageLink: "";
    addressID: number;
    contactInfoID: number;
    dateOfBirth: Date;
    password: string;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: Date;
    updateDate: Date;

    constructor(props) {
        super(props);
    }


    public get displayName(): string {
        return this.firstName + " " + this.lastName;
    }


}