import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from '../../../commons/models/user';
import { DoctorSpeciality } from './doctor-speciality';
import { DoctorLocationSchedule } from './doctor-location-schedule';

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
    genderId:1,
    doctorSpecialities: null,
    doctorLocationSchedules: null,
    isCalendarPublic: false,
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
    genderId:number;
    doctorSpecialities: DoctorSpeciality[];
    doctorLocationSchedules: DoctorLocationSchedule[]; 
    isCalendarPublic: boolean;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;


    constructor(props) {
        super(props);
    }
}