import * as moment from 'moment';
import { AccidentTreatment } from '../../models/accident-treatment';

export class AccidentTreatmentAdapter {
    static parseResponse(data: any): AccidentTreatment {

        let accidentTreatment = null;
        if (data) {
            accidentTreatment = new AccidentTreatment({
                id: data.id,
                patientAccidentInfoId: data.patientAccidentInfoId,
                medicalFacilityName: data.medicalFacilityName,
                doctorName: data.doctorName,
                contactNumber: data.contactNumber,
                address: data.address,
                isDeleted: data.isDeleted ? '1' : '0'
            });
        }
        return accidentTreatment;
    }
}
