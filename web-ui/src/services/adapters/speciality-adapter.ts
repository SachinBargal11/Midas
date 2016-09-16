import {Speciality} from '../../models/speciality';


export class SpecialityAdapter {
    static parseResponse(specialityData: any): Speciality {

        let speciality = null;
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