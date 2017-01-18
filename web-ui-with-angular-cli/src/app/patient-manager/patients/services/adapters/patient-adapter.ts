import { Patient } from '../../models/patient';


export class PatientAdapter {
    static parseResponse(patientData: any): Patient {

        let patient = null;
        if (patientData) {
            patient = new Patient({
                id: patientData.id,
                name: patientData.firstname + ' ' + patientData.lastname,
                firstname: patientData.firstname,
                lastname: patientData.lastname,
                email: patientData.email,
                mobileNo: patientData.mobileNo,
                address: patientData.address,
                status: patientData.status,
                caseId: patientData.caseId
            });
        }
        return patient;
    }
}