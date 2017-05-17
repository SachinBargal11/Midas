import { Record } from 'immutable';
import * as moment from 'moment';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { Speciality } from '../../../account-setup/models/speciality';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { VisitReferralProcedureCode } from '../../patient-visit/models/visit-referral-procedure-code';
import { Company } from '../../../account/models/company';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { User } from '../../../commons/models/user';

const PendingReferralRecord = Record({
    id: 0,
    pendingReferralId: 0,
    fromCompanyId: 0,
    fromLocationId: 0,
    fromDoctorId: 0,
    forSpecialtyId: 0,
    forRoomId: 0,
    forRoomTestId: 0,
    toCompanyId: 0,
    toLocationId: 0,
    toDoctorId: 0,
    toRoomId: 0,
    scheduledPatientVisitId: 0,
    dismissedBy: 0,
    fromCompany: null,
    toCompany: null,
    fromDoctor: null,
    toDoctor: null,
    fromLocation: null,
    // scheduledPatientVisit:null,
    forRoom: null,
    toRoom: null,
    forRoomTest: null,
    forSpecialty: null,
    dismissedByUser: null,
    referralProcedureCode: [],
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, // Moment
    updateDate: null,// Moment
    caseId: null,
    fromUserId: null
});
export class PendingReferral extends PendingReferralRecord {
    id: number;
    pendingReferralId: number;
    fromCompanyId: number;
    fromLocationId: number;
    fromDoctorId: number;
    forSpecialtyId: number;
    forRoomId: number;
    forRoomTestId: number;
    toCompanyId: number;
    toLocationId: number;
    toDoctorId: number;
    toRoomId: number;
    scheduledPatientVisitId: number;
    dismissedBy: number;
    fromCompany: Company;
    toCompany: Company;
    fromDoctor: Doctor;
    toDoctor: Doctor;
    fromLocation: LocationDetails;
    // scheduledPatientVisit:null,
    forRoom: Room;
    toRoom: Room;
    forRoomTest: Tests;
    forSpecialty: Speciality;
    dismissedByUser: User;
    referralProcedureCode: VisitReferralProcedureCode[];
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    caseId: number;
    fromUserId: number;

    constructor(props) {
        super(props);
    }
}
