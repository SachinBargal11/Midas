import { Record } from 'immutable';
import * as moment from 'moment';
import { Case } from '../models/case';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { User } from '../../../commons/models/user';
import { LocationDetails } from '../../../medical-provider/users/models//location-details';
import { Company } from '../../../account/models/company';
import { ReferralDocument } from './referral-document';
import { Speciality } from '../../../account-setup/models/speciality';
import { Tests } from '../../../medical-provider/rooms/models/tests';

const ReferralRecord = Record({
    id: 0,
    caseId: 0,
    referringCompanyId: 0,
    referringLocationId: 0,
    referringUserId: 0,
    referredToCompanyId: 0,
    referredToLocationId: 0,
    referredToDoctorId: 0,
    referredToRoomId: 0,
    referredToSpecialtyId: 0,
    referredToRoomTestId: 0,
    note: '',
    referredByEmail: '',
    referredToEmail: '',
    referralAccepted: 0,
    room: null,
    case: null,
    referringUser: null,
    referringLocation: null,
    referringCompany: null,
    referredToDoctor: null,
    referredToLocation: null,
    referredToCompany: null,
    referralDocument: null,
    referredToSpecialty: null,
    referredToRoomTest: null,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class Referral extends ReferralRecord {

    id: number;
    caseId: number;
    referringCompanyId: number;
    referringLocationId: number;
    referringUserId: number;
    referredToCompanyId: number;
    referredToLocationId: number;
    referredToDoctorId: number;
    referredToRoomId: number;
    referredToSpecialtyId: number;
    referredToRoomTestId: number;
    note: string;
    referredByEmail: string;
    referredToEmail: string;
    referralAccepted: number;
    room: Room;
    case: Case;
    referringUser: User;
    referringLocation: LocationDetails;
    referringCompany: Company;
    referredToDoctor: Doctor;
    referredToLocation: LocationDetails;
    referredToCompany: Company;
    referralDocument: ReferralDocument;
    referredToSpecialty: Speciality;
    referredToRoomTest: Tests;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}