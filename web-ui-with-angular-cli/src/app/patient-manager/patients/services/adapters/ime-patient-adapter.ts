import * as moment from 'moment';
import { ImePatient } from '../../models/ime-patient'

export class ImePatientAdapter {
    static parseResponse(data: any): ImePatient {

        let imepatient = null;

        imepatient = new ImePatient({
            id: data.id,
            patientId: data.patientId,
            caseId: data.caseId,
            caseAndPatientName: data.caseAndPatientName,
        });

        return imepatient;
    }
}
