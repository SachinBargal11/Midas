import * as moment from 'moment';
import { Procedure } from '../../../../commons/models/procedure';
import { UserAdapter } from '../../../../medical-provider/users/services/adapters/user-adapter';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import { RoomsAdapter } from '../../../../medical-provider/rooms/services/adapters/rooms-adapter';
import { TestsAdapter } from '../../../../medical-provider/rooms/services/adapters/tests-adapter';
import { LocationDetailAdapter } from '../../../../medical-provider/locations/services/adapters/location-detail-adapter';
import { SpecialityAdapter } from '../../../../account-setup/services/adapters/speciality-adapter';
import { InboundOutboundList } from '../../models/inbound-outbound-referral';
import { VisitReferralProcedureCode } from '../../../patient-visit/models/visit-referral-procedure-code';
import { PatientVisitAdapter } from '../../../../patient-manager/patient-visit/services/adapters/patient-visit-adapter';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';
import { VisitReferralProcedureCodeAdapter } from '../../../patient-visit/services/adapters/visit-referral-procedure-code-adapter';
import { CaseAdapter } from '../../../cases/services/adapters/case-adapter';
import { ReferralDocumentAdapter } from '../../../cases/services/adapters/referral-document-adapters';
import { ReferralDocument } from '../../../cases/models/referral-document';
import { UnscheduledVisitAdapter } from '../../../../patient-manager/patient-visit/services/adapters/unscheduled-visit-adapter';
import { UnscheduledVisit } from '../../../patient-visit/models/unscheduled-visit';

export class InboundOutboundReferralAdapter {
    static parseResponse(data: any): InboundOutboundList {

        let inboundOutboundList = null;
        let visitReferralProcedureCodes: VisitReferralProcedureCode[] = [];
        let caseReferralDocument: ReferralDocument[] = [];
        let refunScheduledVisit: UnscheduledVisit[] = [];
        if (data) {
            if (data.referralProcedureCode) {
                for (let referralProcedureCode of data.referralProcedureCode) {
                    visitReferralProcedureCodes.push(VisitReferralProcedureCodeAdapter.parseResponseReferral(referralProcedureCode));
                }
            }
            if (data.referralDocument) {
                for (let referralDocument of data.referralDocument) {
                    caseReferralDocument.push(ReferralDocumentAdapter.parseResponse(referralDocument));
                }
            }

            if (data.unScheduledVisit) {
                for (let unScheduledVisit of data.unScheduledVisit) {
                    refunScheduledVisit.push(UnscheduledVisitAdapter.parseResponse(unScheduledVisit));
                }
            }
            
            inboundOutboundList = new InboundOutboundList({
                id: data.id,
                pendingReferralId: data.pendingReferralId,
                fromCompanyId: data.fromCompanyId,
                fromLocationId: data.fromLocationId,
                fromDoctorId: data.fromDoctorId,
                forSpecialtyId: data.forSpecialtyId,
                forRoomTestId: data.forRoomTestId,
                forRoomId: data.forRoomId,
                toCompanyId: data.toCompanyId,
                toLocationId: data.toLocationId,
                toDoctorId: data.toDoctorId,
                toRoomId: data.toRoomId,
                scheduledPatientVisitId: data.scheduledPatientVisitId,
                dismissedBy: data.dismissedBy,
                fromCompanyName: data.fromCompanyName,
                toCompanyName: data.toCompanyName,
                fromDoctorFirstName: data.fromDoctorFirstName,
                fromDoctorLastName: data.fromDoctorLastName,
                toDoctorFirstName: data.toDoctorFirstName,
                toDoctorLastName: data.toDoctorLastName,
                fromLocationName: data.fromLocationName,
                toLocationName: data.toLocationName,
                forRoom: RoomsAdapter.parseResponse(data.forRoom),
                toRoom: RoomsAdapter.parseResponse(data.toRoom),
                forRoomTest: TestsAdapter.parseResponse(data.forRoomTest),
                forSpecialty: SpecialityAdapter.parseResponse(data.forSpecialty),
                dismissedByUser: UserAdapter.parseResponse(data.dismissedByUser),
                referralProcedureCode: visitReferralProcedureCodes,
                referralDocument: caseReferralDocument,
                patientFirstName: data.patientFirstName,
                patientLastName: data.patientLastName,
                case: CaseAdapter.parseResponse(data.case),
                isDeleted: data.isDeleted ? true : false,
                createByUserId: data.createByUserId,
                updateByUserId: data.updateByUserId,
                createDate: moment(data.createDate), // Moment
                updateDate: moment(data.updateDate), // Moment
                caseId: data.caseId,
                unScheduledVisit: refunScheduledVisit
            });
        }
        return inboundOutboundList;
    }
}