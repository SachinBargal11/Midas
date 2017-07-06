import { Patient } from '../../models/patient';
import { UserAdapter } from '../../../../commons/services/adapters/user-adapter';
import * as moment from 'moment';
import { PatientDocumentAdapter } from './patient-document-adapter';
import { PatientDocument } from '../../models/patient-document';

export class PatientAdapter {
    static parseResponse(data: any): Patient {

        let patient: Patient = null;
        let companyId : number = 0;
        let patientDocuments: PatientDocument[] = [];
        if (data) {
            if (data.user.userCompanies) {
                for (let company of data.user.userCompanies) {
                    companyId = company.companyId;
                }
            }
             if (data.patientDocuments) {
                for (let patientDocument of data.patientDocuments) {
                    patientDocuments.push(PatientDocumentAdapter.parseResponse(patientDocument));
                    // patientDocuments.push(patientDocument);
                }
            }
            patient = new Patient({
                id: data.id,
                ssn: data.ssn,
                weight: data.weight,
                height: data.height,
                maritalStatusId: data.maritalStatusId,
                dateOfFirstTreatment: data.dateOfFirstTreatment ? moment(data.dateOfFirstTreatment) : null,
                user: UserAdapter.parseResponse(data.user),
                companyId: companyId,  
                patientDocuments: patientDocuments,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return patient;
    }
}
