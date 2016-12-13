import { Record } from 'immutable';
import moment from 'moment';
import { Address } from './address';
import { Contact } from './contact';
import { UserType } from './enums/user-type';
import { Gender } from './enums/Gender';

const UserRecord = Record({
    id: 0,
    name: '',
    userType: UserType.Owner,
    accountId: '',
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: Gender.MALE,
    imageLink: '',
    address: null, //Address
    contact: null, //Contact
    dateOfBirth: moment(), //Moment
    isDeleted: 0,
    createByUserId: 0,
    updateByUserId: 0,
    // createDate: null, //Moment
    // updateDate: null //Moment
});

export class User extends UserRecord {

    id: number;
    name: string;
    userType: UserType;
    accountId: number;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: Gender;
    imageLink: string;
    address: Address;
    contact: Contact;
    dateOfBirth: moment.MomentStatic;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    // createDate: moment.MomentStatic;
    // updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }

}