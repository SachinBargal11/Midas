import { Patient } from '../../models/patient';
import { UserAdapter } from '../../../../medical-provider/users/services/adapters/user-adapter';


export class PatientAdapter {
    static parseResponse(patientData: any): Patient {

        let patient: Patient = null;
        if (patientData) {
            patient = new Patient({
                user: UserAdapter.parseResponse(patientData)
            });
        }
        return patient;
    }
}