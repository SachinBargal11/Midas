import { Patient } from '../../models/patient';
import { UserAdapter } from '../../../../medical-provider/users/services/adapters/user-adapter';
import { EmployerAdapter } from '../../services/adapters/employer-adapter';
import { InsuranceAdapter } from '../../services/adapters/insurance-adapter';
import { AccidentAdapter } from '../../services/adapters/accident-adapter';
import * as moment from 'moment';

export class PatientAdapter {
    static parseResponse(patientData: any): Patient {

        let patient: Patient = null;
        if (patientData) {
            patient = new Patient({
                id: patientData.id,
                ssn: patientData.ssn,
                wcbNo: patientData.wcbNo,
                weight: patientData.weight,
                maritalStatusId: patientData.maritalStatusId,
                drivingLicence: patientData.drivingLicence,
                emergencyContactName: patientData.emergenceyContactName,
                emergencyContactRelation: patientData.emergenceyContactRelation,
                emergencyContactNumber: patientData.emergenceyContactNumber,
                user: UserAdapter.parseResponse(patientData.user),
                employer: EmployerAdapter.parseResponse(patientData.employer),
                insurance: InsuranceAdapter.parseResponse(patientData.insurance),
                accidentAddress: AccidentAdapter.parseResponse(patientData.accidentAddress),
                isDeleted: patientData.isDeleted ? true : false,
                createByUserID: patientData.createbyuserID,
                createDate: patientData.createDate ? moment.utc(patientData.createDate) : null,
                updateByUserID: patientData.updateByUserID,
                updateDate: patientData.updateDate ? moment.utc(patientData.updateDate) : null,
            });
        }
        return patient;
    }
}