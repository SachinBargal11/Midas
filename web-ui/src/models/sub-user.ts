import {Record} from 'immutable';
import Moment from 'moment';

const UserRecord = Record({
    UserID: 0,
    AccountID: 0,
    UserName: "",
    MiddleName: "",
    LastName: "",
    Gender: "",
    UserType: 0,
	ReferencefromUserTypetableImageLink: "",
    DateOfBirth: Moment(),
    Password: "",
    CreateByUserID: 0
});

const AddressRecord = Record({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    mobileNo: "",
    address: "",
    dob: Moment(),
    createdUser: 0
});

const ContactAddress = Record({

});

const SubUserRecord = Record({
    UserData: {
        UserInfo: UserRecord,
        AddressInfo: AddressRecord,
        ContactInfo: ContactAddress
    }
})

export class SubUser extends SubUserRecord {

    id: number;
    firstname: string;
    lastname: string;
    email: string;
    mobileNo: string;
    address: string;
    dob: Date;
    createdUser: number

    constructor(props) {
        super(props);
    }

}