import * as moment from 'moment';
import * as _ from 'underscore';
import { VisitReferralProcedureCode } from '../../../patient-visit/models/visit-referral-procedure-code';
import { Speciality } from '../../../../account-setup/models/speciality';
import { Tests } from '../../../../medical-provider/rooms/models/tests';
import { visitReferralAdapter } from '../../../patient-visit/services/adapters/visit-referral-adapter';
import { SpecialityAdapter } from '../../../../account-setup/services/adapters/speciality-adapter';
import { TestsAdapter } from '../../../../medical-provider/rooms/services/adapters/tests-adapter';
import { PendingReferralList } from '../../models/pending-referral-list';



export class PendingReferralListAdapter {
    static parseResponse(data: any): PendingReferralList {

        let pendingReferralList: PendingReferralList = null;
        if (data) {
            pendingReferralList = new PendingReferralList({
                id: 0,
                patientVisitId: data.patientVisitId,
                fromCompanyId: data.fromCompanyId,
                fromLocationId: data.fromLocationId,
                fromDoctorId: data.fromDoctorId,
                forSpecialtyId: data.forSpecialtyId,
                forRoomId:data.forRoomId,
                forRoomTestId: data.forRoomTestId,
                dismissedBy: data.dismissedBy,
                caseId: data.caseId,
                patientId: data.patientId,
                userId: data.userId,
                isReferralCreated: data.isReferralCreated ? true : false,
                doctorFirstName: data.doctorFirstName,
                doctorLastName: data.doctorLastName,
                room: data.room,
                patientFirstName: data.patientFirstName,
                patientLastName: data.patientLastName,
                roomTest:TestsAdapter.parseResponse(data.roomTest),
                pendingReferralProcedureCode: visitReferralAdapter.parseResponse(data.pendingReferralProcedureCode),
                speciality: SpecialityAdapter.parseResponse(data.speciality),
                invitationID: 0,
                isDeleted: data.isDeleted ? true : false,
                createByUserId: data.createbyuserID,
                updateByUserId: data.updateByUserID

            });
        }
        return pendingReferralList;
    }

}

