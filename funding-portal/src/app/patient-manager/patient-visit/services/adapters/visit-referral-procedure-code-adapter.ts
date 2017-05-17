import * as moment from 'moment';
import { Procedure } from '../../../../commons/models/procedure';
import { ProcedureAdapter } from '../../../../commons/services/adapters/procedure-adapter';
import { VisitReferralProcedureCode } from '../../models/visit-referral-procedure-code'
export class VisitReferralProcedureCodeAdapter {
    static parseResponse(data: any): VisitReferralProcedureCode {

        let visitReferralProcedure = null;
        if (data) {
            visitReferralProcedure = new VisitReferralProcedureCode({
                id: data.id,
                pendingReferralId: data.pendingReferralId,
                procedureCodeId: data.procedureCodeId,
                procedureCode: ProcedureAdapter.parseResponse(data.procedureCode),
                isDeleted: data.isDeleted,
                createByUserId: data.createByUserId,
                updateByUserId: data.updateByUserId,
                createDate: moment(data.createDate), // Moment
                updateDate: moment(data.updateDate), // Moment
                originalResponse: data
            });
        }
        return visitReferralProcedure;
    }
    static parseResponseReferral(data: any): VisitReferralProcedureCode {

        let visitReferralProcedure = null;
        if (data) {
            visitReferralProcedure = new VisitReferralProcedureCode({
                id: data.id,
                pendingReferralId: data.referralId,
                procedureCodeId: data.procedureCodeId,
                procedureCode: ProcedureAdapter.parseResponse(data.procedureCode),
                isDeleted: data.isDeleted,
                createByUserId: data.createByUserId,
                updateByUserId: data.updateByUserId,
                createDate: moment(data.createDate), // Moment
                updateDate: moment(data.updateDate), // Moment
                originalResponse: data
            });
        }
        return visitReferralProcedure;
    }
}