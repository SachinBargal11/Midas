
import { Record } from 'immutable';
import { LocationDetails } from '../../locations/models/location-details';
import { Speciality } from '../../../account-setup/models/speciality';
import { Doctor } from './doctor';

const DoctorLocationSpecialityRecord = Record({
    id: 0,
    doctor: null,
    location: null,
    speciality: null
});

export class DoctorLocationSpeciality extends DoctorLocationSpecialityRecord {
    id: number;
    doctor: Doctor;
    location: LocationDetails;
    speciality: Speciality;

    constructor(props) {
        super(props);
    }

}
