import {Record} from 'immutable';
import moment from 'moment';
import {User} from './user';
import {Address} from './address';
import {Contact} from './contact';

const UserDetailRecord = Record({

    user: null, //Address
    address: null, //Address
    contactInfo: null, //Contact

});

export class UserDetail extends UserDetailRecord {

    user: User;
    address: Address;
    contact: Contact;


    constructor(props) {
        super(props);
    }

}