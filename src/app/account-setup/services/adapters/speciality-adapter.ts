import { Speciality } from '../../models/speciality';


export class SpecialityAdapter {
    static parseResponse(specialityData: any): Speciality {

        let speciality = null;
        if (specialityData) {
            speciality = new Speciality({
                id: specialityData.id,
                name: specialityData.name,
                specialityCode: specialityData.specialityCode,
                isunitApply: specialityData.isunitApply,
                color: specialityData.colorCode,
                mandatoryProcCode: specialityData.mandatoryProcCode ? true : false
            });
        }
        return speciality;
    }
}