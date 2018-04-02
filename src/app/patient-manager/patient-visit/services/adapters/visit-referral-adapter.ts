import * as moment from 'moment';
import { Procedure } from '../../../../commons/models/procedure';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import { RoomsAdapter } from '../../../../medical-provider/rooms/services/adapters/rooms-adapter';
import { TestsAdapter } from '../../../../medical-provider/rooms/services/adapters/tests-adapter';
import { SpecialityAdapter } from '../../../../account-setup/services/adapters/speciality-adapter';
import { VisitReferral } from '../../models/visit-referral';
import { VisitReferralProcedureCode } from '../../models/visit-referral-procedure-code';
import { PatientVisitAdapter } from '../../../../patient-manager/patient-visit/services/adapters/patient-visit-adapter';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';
import { VisitReferralProcedureCodeAdapter } from './visit-referral-procedure-code-adapter';

export class visitReferralAdapter {
    static parseResponse(data: any): VisitReferral {

        let visitReferral = null;
        let visitReferralProcedureCodes: VisitReferralProcedureCode[] = [];
        if (data) {
            if (data.pendingReferralProcedureCode) {
                for (let visitReferralProcedureCode of data.pendingReferralProcedureCode) {
                    visitReferralProcedureCodes.push(VisitReferralProcedureCodeAdapter.parseResponse(visitReferralProcedureCode));
                }
            }
            visitReferral = new VisitReferral({
                id: data.id,
                patientVisitId: data.patientVisitId,
                fromCompanyId: data.fromCompanyId,
                fromLocationId: data.fromLocationId,
                fromDoctorId: data.fromDoctorId,
                forSpecialtyId: data.forSpecialtyId,
                forRoomId: data.forRoomId,
                forRoomTestId: data.forRoomTestId,
                isReferralCreated: data.isReferralCreated ? true : false,
                patientVisit: PatientVisitAdapter.parseResponse(data.patientVisit),
                doctor: DoctorAdapter.parseResponse(data.doctor),
                speciality: SpecialityAdapter.parseResponse(data.specialty),
                room: RoomsAdapter.parseResponse(data.room),
                roomTest: TestsAdapter.parseResponse(data.roomTest),
                pendingReferralProcedureCode: visitReferralProcedureCodes,
                isDeleted: data.isDeleted ? true : false,
                createByUserId: data.createByUserId,
                updateByUserId: data.updateByUserId,
                createDate: moment(data.createDate), // Moment
                updateDate: moment(data.updateDate), // Moment
                originalResponse: data
            });
        }
        return visitReferral;
    }
}