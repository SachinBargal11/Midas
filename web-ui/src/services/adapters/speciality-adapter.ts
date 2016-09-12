import {Speciality} from '../../models/speciality';
import Moment from 'moment';


export class SpecialityAdapter {
    static parseResponse(specialityData: any): Speciality {

        let speciality = null;
        let tempSpeciality = _.omit(specialityData, 'updateDate');
        if (specialityData) {
            speciality = new Speciality({
                speciality: {
                    id: specialityData.id,
                    name: specialityData.name,
                    specialityCode: specialityData.specialityCode
                    }
            });
        }
        return speciality;
    }
}