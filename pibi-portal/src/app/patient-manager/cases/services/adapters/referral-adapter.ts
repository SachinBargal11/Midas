import { CaseAdapter } from './case-adapter';
import * as moment from 'moment';
import { Referral } from '../../models/referral';
import { ReferralDocument } from '../../models/referral-document';
import { RoomsAdapter } from '../../../../medical-provider/rooms/services/adapters/rooms-adapter';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';
import { UserAdapter } from '../../../../medical-provider/users/services/adapters/user-adapter';
import { LocationDetailAdapter } from '../../../../medical-provider/locations/services/adapters/location-detail-adapter';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import { ReferralDocumentAdapter } from './referral-document-adapters';
import { SpecialityAdapter } from '../../../../account-setup/services/adapters/speciality-adapter';
import { TestsAdapter } from '../../../../medical-provider/rooms/services/adapters/tests-adapter';

export class ReferralAdapter {
    static parseResponse(data: any): Referral {

        let referral = null;
        let referralDocuments: ReferralDocument[] = [];
        if (data) {
            if (data.referralDocument) {
                for (let document of data.referralDocument) {
                    referralDocuments.push(ReferralDocumentAdapter.parseResponse(document));
                }
            }
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
                referredToSpecialtyId: data.referredToSpecialtyId,
                referredToRoomTestId: data.referredToRoomTestId,
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
                referralDocument: referralDocuments,
                referredToSpecialty: SpecialityAdapter.parseResponse(data.referredToSpecialty),
                referredToRoomTest: TestsAdapter.parseResponse(data.referredToRoomTest),
                firstName: data.firstName,
                lastName: data.lastName,
                cellPhone: data.cellPhone,
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
