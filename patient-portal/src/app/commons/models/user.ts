import { Record } from 'immutable';
import * as moment from 'moment';
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
    dateOfBirth: moment.Moment;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    // createDate: moment.Moment;
    // updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

    get userTypeLabel(): string {
        return User.getUserTypeLabel(this.userType);
    }

    get displayName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    static getUserTypeLabel(userType: UserType): string {
        switch (userType) {
            case UserType.Admin:
                return 'Admin';
            case UserType.Owner:
                return 'Owner';
            case UserType.Doctor:
                return 'Doctor';
            case UserType.Patient:
                return 'Patient';
            case UserType.Attorney:
                return 'Attorney';
            case UserType.Adjuster:
                return 'Adjuster';
            case UserType.Accounts:
                return 'Accounts';
        }
    }

    get genderLabel(): string {
        return User.getGender(this.gender);
    }
    // tslint:disable-next-line:member-ordering
    static getGender(genderStatus: Gender): string {
        switch (genderStatus) {
            case Gender.MALE:
                return 'Male';
            case Gender.FEMALE:
                return 'Female';
            case Gender.OTHERS:
                return 'Others';
        }
    }

}