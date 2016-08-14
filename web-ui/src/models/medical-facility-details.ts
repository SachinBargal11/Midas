import {Record} from 'immutable';
import moment from 'moment';
import {Account} from './account';
import {MedicalFacility} from './medical-facility';
import {User} from './user';
import {Address} from './address';
import {Contact} from './contact';

const MedicalFacilityRecord = Record({

    account: null, //Account
    user: null, //User
    address: null, //Address
    contactInfo: null, //Contact
    medicalFacility: null, //MedicalFacility
});

export class MedicalFacilityDetail extends MedicalFacilityRecord {

    account: Account;
    user: User;
    address: Address;
    contact: Contact;
    medicalFacility: MedicalFacility;


    constructor(props) {
        super(props);
    }

}