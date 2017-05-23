import {Record} from 'immutable';
import * as moment from 'moment';
import {Company} from '../../../account/models/company';
import {Doctor} from '../../../medical-provider/users/models/doctor';
import {DoctorLocationSchedule} from '../../../medical-provider/users/models/doctor-location-schedule';
import {Speciality} from '../../../account-setup/models/speciality';

const DoctorDetailRecord = Record({
    doctor: null,
    userCompanies: null,
    doctorSpecialities: null,
    doctorLocationSchedules: null,
});

export class DoctorDetail extends DoctorDetailRecord {
    doctor: Doctor;
    userCompanies: Company[];
    doctorSpecialities: Speciality[];
    doctorLocationSchedules: DoctorLocationSchedule[];

    constructor(props) {
        super(props);
    }
}