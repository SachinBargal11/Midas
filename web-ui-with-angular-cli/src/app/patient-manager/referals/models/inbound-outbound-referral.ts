import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { VisitReferralProcedureCode } from '../../patient-visit/models/visit-referral-procedure-code';
import { Speciality } from '../../../account-setup/models/speciality';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { Case } from '../../cases/models/case';
import { ReferralDocument } from '../../cases/models/referral-document';


const InboundOutboundReferralRecord = Record({
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
    patientId: 0,
    caseId: 0,
    patientVisitId: 0,
    fromCompanyName: null,
    toCompanyName: null,
    fromDoctorFirstName: null,
    fromDoctorLastName: null,
    toDoctorFirstName: null,
    toDoctorLastName: null,
    fromLocationName: null,
    toLocationName: null,
    pendingReferral: null,
    forRoom: null,
    toRoom: null,
    forRoomTest: null,

    patientFirstName: '',
    patientLastName: '',

    referralProcedureCode: null,
    referralDocument: null,
    forSpecialty: null,
    case: null,
    invitationID: 0,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0

});

export class InboundOutboundList extends InboundOutboundReferralRecord {

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
    patientId: number;
    caseId: number;
    patientVisitId: number;
    fromCompanyName: string;
    toCompanyName: string;
    fromDoctorFirstName: string;
    fromDoctorLastName: string;
    toDoctorFirstName: string;
    toDoctorLastName: string;
    fromLocationName: string;
    toLocationName: string;
    forRoom: string;
    toRoom: string;
    forRoomTest: string;
    patientFirstName: string;
    patientLastName: string;
    referralProcedureCode: VisitReferralProcedureCode[];
    referralDocument: ReferralDocument[];
    speciality: Speciality;
    case: Case;
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
        return this.fromDoctorFirstName + ' ' + this.fromDoctorLastName;
    }
    get displayToDoctorName(): string {
        if(this.toDoctorFirstName != null && this.toDoctorLastName != null ){
        return this.toDoctorFirstName + ' ' + this.toDoctorLastName;
        }else{
            return 'NA';
        }    
    }
    get displayLocationName(): string {
        if(this.toLocationName != null){
        return this.toLocationName;
        }else{
            return 'NA';
        }    
    }
}




