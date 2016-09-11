import {Speciality} from '../../models/speciality';
import Moment from 'moment';


export class SpecialityAdapter {
    static parseResponse(specialtyData: any): Speciality {

        let specialty = null;
        let tempSpeciality = _.omit(specialtyData, 'updateDate');
        if (specialtyData) {
            specialty = new Speciality({
                specialty: {
                    id: specialtyData.id,
                    name: specialtyData.name,
                    specialityCode: specialtyData.specialityCode
                    }
            });
        }
        return specialty;
    }
}