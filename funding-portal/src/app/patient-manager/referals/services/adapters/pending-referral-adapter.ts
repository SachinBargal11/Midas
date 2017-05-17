import * as moment from 'moment';
import { Procedure } from '../../../../commons/models/procedure';
import { UserAdapter } from '../../../../medical-provider/users/services/adapters/user-adapter';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import { RoomsAdapter } from '../../../../medical-provider/rooms/services/adapters/rooms-adapter';
import { TestsAdapter } from '../../../../medical-provider/rooms/services/adapters/tests-adapter';
import { LocationDetailAdapter } from '../../../../medical-provider/locations/services/adapters/location-detail-adapter';
import { SpecialityAdapter } from '../../../../account-setup/services/adapters/speciality-adapter';
import { PendingReferral } from '../../models/pending-referral';
import { VisitReferralProcedureCode } from '../../../patient-visit/models/visit-referral-procedure-code';
import { PatientVisitAdapter } from '../../../../patient-manager/patient-visit/services/adapters/patient-visit-adapter';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';
import { VisitReferralProcedureCodeAdapter } from '../../../patient-visit/services/adapters/visit-referral-procedure-code-adapter';

export class PendingReferralAdapter {
    static parseResponse(data: any): PendingReferral {

        let pendingReferral = null;
        let visitReferralProcedureCodes: VisitReferralProcedureCode[] = [];
        if (data) {
            if (data.referralProcedureCode) {
                for (let referralProcedureCode of data.referralProcedureCode) {
                    visitReferralProcedureCodes.push(VisitReferralProcedureCodeAdapter.parseResponseReferral(referralProcedureCode));
                }
            }
            pendingReferral = new PendingReferral({
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
                fromCompany: CompanyAdapter.parseResponse(data.fromCompany),
                toCompany: CompanyAdapter.parseResponse(data.toCompany),
                fromDoctor: DoctorAdapter.parseResponse(data.fromDoctor),
                toDoctor: DoctorAdapter.parseResponse(data.toDoctor),
                fromLocation: LocationDetailAdapter.parseResponse(data.fromLocation),
                toLocation: LocationDetailAdapter.parseResponse(data.toLocation),
                forRoom: RoomsAdapter.parseResponse(data.forRoom),
                toRoom: RoomsAdapter.parseResponse(data.toRoom),
                forRoomTest: TestsAdapter.parseResponse(data.forRoomTest),
                forSpecialty: SpecialityAdapter.parseResponse(data.forSpecialty),
                dismissedByUser:UserAdapter.parseResponse(data.dismissedByUser),
                referralProcedureCode: visitReferralProcedureCodes,
                isDeleted: data.isDeleted ? true : false,
                createByUserId: data.createByUserId,
                updateByUserId: data.updateByUserId,
                createDate: moment(data.createDate), // Moment
                updateDate: moment(data.updateDate), // Moment

            });
        }
        return pendingReferral;
    }
}