import { Patient } from '../../models/patient';
import { Company } from '../../../../account/models/company';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import { UserAdapter } from '../../../../medical-provider/users/services/adapters/user-adapter';
import { PatientDocumentAdapter } from './patient-document-adapter';
import { PatientDocument } from '../../models/patient-document';
import * as moment from 'moment';

export class PatientAdapter {
    static parseResponse(data: any): Patient {                
        let patient: Patient = null;
        let companies: Company[] = [];
        let LanguagePreferenceMappings: any[] = [];
        let patientDocuments: PatientDocument[] = [];
        if (data) {
            if (data.patientLanguagePreferenceMappings) {
                for (let language of data.patientLanguagePreferenceMappings) {
                    LanguagePreferenceMappings.push(language);
                }
            } 
            if (data.user) {
                if (data.user.userCompanies) {
                    for (let company of data.user.userCompanies) {
                        // companies.push(CompanyAdapter.parseResponse(company));
                        companies.push(company);
                    }
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
                companyId: data.companyId,
                companies: companies,
                patientDocuments: patientDocuments,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
                parentOrGuardianName: data.parentOrGuardianName,
                emergencyContactName: data.emergencyContactName,
                emergencyContactPhone: data.emergencyContactPhone,
                spouseName: data.spouseName,
                patientLanguagePreferenceMappings: LanguagePreferenceMappings,
                languagePreferenceOther: data.languagePreferenceOther,
                isRefferedPatient: data.IsRefferedPatient,
                addedByCompanyId: data.addedByCompanyId,
            });
        }
        
        return patient;
    }
}
