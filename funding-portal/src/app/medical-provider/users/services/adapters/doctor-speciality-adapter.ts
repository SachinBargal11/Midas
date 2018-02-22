import { SpecialityAdapter } from '../../../../account-setup/services/adapters/speciality-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';
import { DoctorSpeciality } from '../../models/doctor-speciality';

export class DoctorSpecialityAdapter {

    static parseResponse(doctorSpecialityData: any): DoctorSpeciality {

        let doctorSpeciality = null;

        if (doctorSpecialityData) {
            doctorSpeciality = new DoctorSpeciality({
                id: doctorSpecialityData.id,
                speciality: SpecialityAdapter.parseResponse(doctorSpecialityData.specialty),
                isDeleted: doctorSpecialityData.isDeleted ? true : false
            });
        }
        return doctorSpeciality;
    }
}