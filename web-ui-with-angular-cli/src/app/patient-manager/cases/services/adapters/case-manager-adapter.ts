import * as moment from 'moment';
import { CaseManager } from '../../../case-manager/models/case-manager';
import { EmployerAdapter } from '../../../patients/services/adapters/employer-adapter';

export class CaseManagerAdapter {
    static parseResponse(data: any): CaseManager {

        let cases = null;
        if (data) {
            cases = new CaseManager({
                id: data.id,
                patientId: data.patientId,
                userId: data.userId,
                caseId: data.caseId,
                userName: data.userName,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                caseName: data.caseName,
                caseTypeId: data.caseTypeId,
                locationId: data.locationId,
                patientEmpInfoId: data.patientEmpInfoId,
                carrierCaseNo: data.carrierCaseNo,
                transportation: data.transportation ? true : false,
                caseStatusId: data.caseStatusId,
                attorneyId: data.attorneyId,
                patientEmpInfo: EmployerAdapter.parseResponse(data.patientEmpInfo),
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return cases;
    }
}
