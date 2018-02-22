import { TestsAdapter } from '../../../rooms/services/adapters/tests-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';
import { DoctorTestSpeciality } from '../../models/doctor-test-speciality';

export class DoctorTestSpecialityAdapter {

    static parseResponse(doctorTestSpecialityData: any): DoctorTestSpeciality {

        let doctorTestSpeciality = null;

        if (doctorTestSpecialityData) {
            doctorTestSpeciality = new DoctorTestSpeciality({
                id: doctorTestSpecialityData.id,
                testSpeciality: TestsAdapter.parseResponse(doctorTestSpecialityData.roomTest),
                isDeleted: doctorTestSpecialityData.isDeleted ? true : false
            });
        }
        return doctorTestSpeciality;
    }
}