import { SpecialityAdapter } from '../../../../account-setup/services/adapters/speciality-adapter';
import { LocationDetailAdapter } from '../../services/adapters/location-detail-adapter';
import { DoctorAdapter } from './doctor-adapter';
import { DoctorLocationSpeciality } from '../../models/doctor-location-speciality';


export class DoctorLocationSpecialityAdapter {
    static parseResponse(data: any): DoctorLocationSpeciality {
        let doctorLocationSpeciality = null;
        if (data) {
            doctorLocationSpeciality = new DoctorLocationSpeciality({
                id: data.id,
                doctor: DoctorAdapter.parseResponse(data.doctor),
                location: LocationDetailAdapter.parseResponse(data.location),
                speciality: SpecialityAdapter.parseResponse(data.speciality)
            });
        }
        return doctorLocationSpeciality;
    }
}
