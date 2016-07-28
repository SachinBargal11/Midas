import {Record} from 'immutable';
import moment from 'moment';
// import {Address} from './address';
// import {Contact} from './contact';
import {UserType} from './enums/UserType';
import {Gender} from './enums/Gender';

const UserRecord = Record({
    id: 0,
    name: "",
    userType: UserType.Admin,
    accountID: 1,
    userName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: Gender.Male,
    imageLink: "",
    // address: null, //Address
    // contact: null, //Contact
    dateOfBirth: null, //Moment
    password: "",
    isDeleted: false,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class User extends UserRecord {

    id: number;
    name: string;
    userType: UserType;
    accountID: number;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: Gender;
    imageLink: string;
    // address: Address;
    // contact: Contact;
    dateOfBirth: moment.MomentStatic;
    password: string;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.MomentStatic;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }


    public get displayName(): string {
        // return this.firstName + " " + this.lastName;
        return this.name;
    }


}