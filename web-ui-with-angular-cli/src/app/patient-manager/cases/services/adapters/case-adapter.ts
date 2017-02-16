import * as moment from 'moment';
import { Case } from '../../models/case';

export class CaseAdapter {
    static parseResponse(data: any): Case {

        let cases = null;
        if (data) {
            cases = new Case({
                id: data.id,
                patientId: data.patientId,
                caseName: data.caseName,
                caseTypeId: data.caseTypeId,
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
        return cases;
    }
}
