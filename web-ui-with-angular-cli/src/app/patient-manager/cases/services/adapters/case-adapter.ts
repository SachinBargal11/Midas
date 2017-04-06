import { PatientAdapter } from '../../../patients/services/adapters/patient-adapter';
import { Company } from '../../../../account/models/company';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import * as moment from 'moment';
import { Case } from '../../models/case';

export class CaseAdapter {
    static parseResponse(data: any): Case {

        let patient_case = null;
        let companies: Company[] = [];
        if (data) {
            if (data.caseCompanyMapping) {
                for (let company of data.caseCompanyMapping) {
                    companies.push(CompanyAdapter.parseResponse(company.company));
                }
            }
            patient_case = new Case({
                id: data.id,
                patientId: data.patientId,
                patient: PatientAdapter.parseResponse(data.patient2),
                caseName: data.caseName,
                caseTypeId: data.caseTypeId,
                companies: companies,
                locationId: data.locationId,
                carrierCaseNo: data.carrierCaseNo,
                transportation: data.transportation ? true : false,
                caseStatusId: data.caseStatusId,
                attorneyId: data.attorneyId,
                patientEmpInfoId: data.patientEmpInfoId,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return patient_case;
    }

    static parseCaseComapnyResponse(data: any): Case {
        let patient_case = null;
        let companies: Company[] = [];
        if (data) {
            if (data.caseCompanyMapping) {
                for (let company of data.caseCompanyMapping) {
                    companies.push(CompanyAdapter.parseResponse(company.company));
                }
            }
            patient_case = new Case({
                id: data.caseId,
                patient: PatientAdapter.parseResponse({
                    id: data.id,
                    user: {
                        id: data.userId,
                        firstName: data.firstName,
                        middleName: data.middleName,
                        lastName: data.lastName,
                        userName: data.userName
                    }
                }),
                caseName: data.caseName,
                caseTypeId: data.caseTypeId,
                companies: companies,
                locationId: data.locationId,
                carrierCaseNo: data.carrierCaseNo,
                transportation: data.transportation ? true : false,
                caseStatusId: data.caseStatusId,
                attorneyId: data.attorneyId,
                patientEmpInfoId: data.patientEmpInfoId,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return patient_case;
    }
}
