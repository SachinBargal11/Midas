import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { VisitReferralProcedureCode } from '../../patient-visit/models/visit-referral-procedure-code';
import { Speciality } from '../../../account-setup/models/speciality';
import { Tests } from '../../../medical-provider/rooms/models/tests';


const PendingReferralListRecord = Record({
    id: 0,
    patientVisitId: 0,
    fromCompanyId: 0,
    fromLocationId: 0,
    fromDoctorId: 0,
    forSpecialtyId: 0,
    forRoomId: 0,
    forRoomTestId: 0,
    dismissedBy: 0,
    caseId: 0,
    patientId: 0,
    userId: 0,
    isReferralCreated: false,
    doctorFirstName: '',
    doctorLastName: '',
    room: '',
    patientFirstName: '',
    patientLastName: '',
    roomTest: null,
    pendingReferralProcedureCode: null,
    speciality: null,
    invitationID: 0,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0

});

export class PendingReferralList extends PendingReferralListRecord {

    id: number;
    patientVisitId: number;
    fromCompanyId: number;
    fromLocationId: number;
    fromDoctorId: number;
    forSpecialtyId: number;
    forRoomId: number;
    forRoomTestId: number;
    dismissedBy: number;
    caseId: number;
    patientId: number;
    userId: number;
    isReferralCreated: boolean;
    doctorFirstName: string;
    doctorLastName: string;
    room: string;
    patientFirstName: string;
    patientLastName: string;
    roomTest: Tests;
    pendingReferralProcedureCode: VisitReferralProcedureCode[];
    speciality: Speciality;
    invitationID: number;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;

    constructor(props) {
        super(props);
    }

    get displayPatientName(): string {
        return this.patientFirstName + ' ' + this.patientLastName;
    }

    get displayDoctorName(): string {
        return this.doctorFirstName + ' ' + this.doctorLastName;
    }
}




