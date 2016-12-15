import {Record} from 'immutable';
import {Speciality} from './speciality';
import {Doctor} from './doctor';

const DoctorSpecialityRecord = Record({

    doctor: null,
    specialty: null

});

export class DoctorSpeciality extends DoctorSpecialityRecord {

    doctor: Doctor;
    specialty: Speciality;


    constructor(props) {
        super(props);
    }

}
