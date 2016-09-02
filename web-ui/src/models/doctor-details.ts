import {Record} from 'immutable';
import moment from 'moment';
import {User} from './user';
import {Address} from './address';
import {ContactInfo} from './contact';
import {Doctor} from './doctor';

const DoctorDetailRecord = Record({

    doctor: null,
    user: null,
    address: null, //Address
    contactInfo: null, //Contact

});

export class DoctorDetail extends DoctorDetailRecord {

    doctor: Doctor;
    user: User;
    address: Address;
    contactInfo: ContactInfo;


    constructor(props) {
        super(props);
    }

}
