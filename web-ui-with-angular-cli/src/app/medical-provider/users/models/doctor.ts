import {Record} from 'immutable';
import * as moment from 'moment';
import {User} from '../../../commons/models/user';
import {Speciality} from '../../../account-setup/models/speciality';

const DoctorRecord = Record({
    id: 0,
    licenseNumber: '',
    wcbAuthorization: '',
    wcbRatingCode: '',
    npi: '',
    taxType: '',
    title: '',
    userId: 0,
    user: null,
    doctorSpecialities: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class Doctor extends DoctorRecord {

    id: number;
    licenseNumber: string;
    wcbAuthorization: string;
    wcbRatingCode: string;
    npi: string;
    taxType: string;
    title: string;
    userId: number;
    user: User;
    doctorSpecialities: Speciality[];
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}