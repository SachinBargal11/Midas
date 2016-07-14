import {Patient} from '../../models/patient';
import Moment from 'moment';


export class PatientAdapter {
    static parseResponse(patientData: any): Patient {

        let patient = null;
        if (patientData) {
            patient = new Patient({
                id: patientData.id,
                firstname: patientData.firstname,
                lastname: patientData.lastname,
                email: patientData.email,
                mobileNo: patientData.mobileNo,
                address: patientData.address,
                dob: Moment(patientData.dob)
            });
        }
        return patient;
    }
}