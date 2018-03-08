import * as moment from 'moment';
import { CaseLabel } from '../../models/case-label';


export class CaseLabelAdapter {
    static parseResponse(data: any): CaseLabel {

        let caseLabel = null;
        if (data) {
            caseLabel = new CaseLabel({
                id: data.id,
                caseId: data.caseId,
                patientId: data.patientId,
                patient: data.patientName,
                caseTypeText: data.caseTypeText,
                caseStatusText: data.caseStatusText,
                locationName: data.locationName,
                carrierCaseNo: data.carrierCaseNo,
                companyName: data.companyName,
                caseSource: data.caseSource,
                claimFileNumber: data.claimFileNumber,
                attorneyProvider: data.attorneyProvider,
                medicalProvider: data.medicalProvider,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
            });
        }
        return caseLabel;
    }
}
