import { CaseAdapter } from './case-adapter';
import * as moment from 'moment';
import { Referral } from '../../models/referral';
import { RoomsAdapter } from '../../../../medical-provider/rooms/services/adapters/rooms-adapter';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';
import { UserAdapter } from '../../../../medical-provider/users/services/adapters/user-adapter';
import { LocationDetailAdapter } from '../../../../medical-provider/locations/services/adapters/location-detail-adapter';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';

export class ReferralAdapter {
    static parseResponse(data: any): Referral {

        let referral = null;
        if (data) {
            referral = new Referral({
                id: data.id,
                caseId: data.caseId,
                referringCompanyId: data.referringCompanyId,
                referringLocationId: data.referringLocationId,
                referringUserId: data.referringUserId,
                referredToCompanyId: data.referredToCompanyId,
                referredToLocationId: data.referredToLocationId,
                referredToDoctorId: data.referredToDoctorId,
                referredToRoomId: data.referredToRoomId,
                note: data.note,
                referredByEmail: data.referredByEmail,
                referredToEmail: data.referredToEmail,
                referralAccepted: data.referralAccepted,
                room: RoomsAdapter.parseResponse(data.room),
                case: CaseAdapter.parseResponse(data.case),
                referringUser: UserAdapter.parseResponse(data.referringUser),
                referringLocation: LocationDetailAdapter.parseResponse(data.referringLocation),
                referringCompany: CompanyAdapter.parseResponse(data.referringCompany),
                referredToDoctor: DoctorAdapter.parseResponse(data.referredToDoctor),
                referredToLocation: LocationDetailAdapter.parseResponse(data.referredToLocation),
                referredToCompany: CompanyAdapter.parseResponse(data.referredToCompany),
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return referral;
    }
}
