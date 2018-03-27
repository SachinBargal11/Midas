import {Record} from 'immutable';
import * as moment from 'moment';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { Speciality } from '../../../account-setup/models/speciality';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { VisitReferralProcedureCode } from './visit-referral-procedure-code';

const VisitReferralRecord = Record({
    id: 0,
    patientVisitId: 0,
    fromCompanyId: 0,
    fromLocationId: 0,
    fromDoctorId: 0,
    forSpecialtyId: 0,
    forRoomId: 0,
    forRoomTestId: 0,
    isReferralCreated: false,
    patientVisit: null,
    doctor: null,
    speciality: null,
    room: null,
    roomTest: null,
    pendingReferralProcedureCode: [],
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, // Moment
    updateDate: null, // Moment
    doctorSignature: null,
    doctorSignatureType: 0,
    doctorSignatureText: null,
    doctorSignatureFont:null,
    noOfVisits:0,
});

export class VisitReferral extends VisitReferralRecord {

    id: number;
    patientVisitId: number;
    fromCompanyId: number;
    fromLocationId: number;
    fromDoctorId: number;
    forSpecialtyId: number;
    forRoomId: number;
    forRoomTestId: number;
    isReferralCreated: boolean;
    patientVisit: PatientVisit;
    doctor: Doctor;
    speciality: Speciality;
    room: Room;
    roomTest: Tests;
    pendingReferralProcedureCode: VisitReferralProcedureCode[];
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    doctorSignature: string;
    doctorSignatureType:number;
    doctorSignatureText:string;
    doctorSignatureFont:string;
    noOfVisits:number;
    constructor(props) {
        super(props);
    }
}