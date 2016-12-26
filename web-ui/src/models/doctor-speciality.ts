import {Record} from 'immutable';
import {Speciality} from './speciality';
import {Doctor} from './doctor';

const DoctorSpecialityRecord = Record({

    doctor: null,
    specialties: null

});

export class DoctorSpeciality extends DoctorSpecialityRecord {

    doctor: Doctor;
    specialties: Speciality[];


    constructor(props) {
        super(props);
    }

}
