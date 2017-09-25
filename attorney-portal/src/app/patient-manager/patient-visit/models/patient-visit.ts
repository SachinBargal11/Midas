import { Speciality } from '../../../account-setup/models/speciality';
import { Case } from '../../cases/models/case';
import { IEventWrapper } from '../../../commons/models/i-event-wrapper';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import * as RRule from 'rrule';
import { VisitStatus } from './enums/visit-status';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Location } from '../../../medical-provider/locations/models/location';
import { Patient } from '../../../patient-manager/patients/models/patient';
import { DiagnosisCode } from '../../../commons/models/diagnosis-code';
import { Procedure } from '../../../commons/models/procedure';

const PatientVisitRecord = Record({
    id: 0,
    calendarEventId: 0,
    location: null,
    // locationId: 0,
    // case: null,
    caseId: 0,
    patient: null,
    patientId: 0,
    room: null,
    roomId: null,
    doctor: null,
    doctorId: null,
    specialty: null,
    specialtyId: null,
    eventStart: null,
    eventEnd: null,
    notes: '',
    visitStatusId: VisitStatus.SCHEDULED,
    // visitType: 0,
    calendarEvent: null,
    // patientVisitDiagnosisCodes: [],
    // patientVisitProcedureCodes: [],
    // isOutOfOffice: false,
    // leaveStartDate: null,
    // leaveEndDate: null,
    // transportProviderId: 0,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null, //Moment
    subject: '',
    contactPerson: '',
    // agenda: '',
    companyid: 0,
    attorneyId: 0,
    isPatientVisitType: true,
    originalResponse: null

});


export class PatientVisit extends PatientVisitRecord implements IEventWrapper {


    id: number;
    calendarEventId: number;
    location: Location;
    // locationId: number;
    // case: Case;
    caseId: number;
    patient: Patient;
    patientId: number;
    room: Room;
    roomId: number;
    doctor: Doctor;
    doctorId: number;
    specialtyId: number;
    specialty: Speciality;
    eventStart: moment.Moment;
    eventEnd: moment.Moment;
    notes: string;
    visitStatusId: VisitStatus;
    // visitType: number;
    calendarEvent: ScheduledEvent;
    // patientVisitDiagnosisCodes: DiagnosisCode[];
    // patientVisitProcedureCodes: Procedure[];
    // isOutOfOffice: boolean;
    // leaveStartDate: moment.Moment;
    // leaveEndDate: moment.Moment;
    // transportProviderId: number;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    subject: string;
    contactPerson: string;
    // agenda: string;
    companyid: number;
    attorneyId: number;
    isPatientVisitType: boolean;
    originalResponse: any;

    constructor(props) {
        super(props);
    }

    get visitStartAsDate(): Date {
        return this.eventStart ? this.eventStart.toDate() : null;
    }

    get visitEndAsDate(): Date {
        return this.eventEnd ? this.eventEnd.toDate() : null;
    }

    get isOriginalVisit(): boolean {
        return !this.eventStart ? true : false;
    }

    get isExistingVisit(): boolean {
        return !this.isOriginalVisit;
    }

    get visitStatusLabel(): string {
        return PatientVisit.getvisitStatusLabel(this.visitStatusId);
    }

    static getvisitStatusLabel(visitStatus: VisitStatus): string {
        switch (visitStatus) {
            case VisitStatus.SCHEDULED:
                return 'Scheduled';
            case VisitStatus.COMPLETE:
                return 'Complete';
            case VisitStatus.RESCHEDULE:
                return 'Rescheduled';
            case VisitStatus.NOSHOW:
                return 'Noshow';
        }
    }

    get visitDisplayString(): string {
        let visitInfo: string = ``;
        // if (this.locationId && this.location) {
        //     visitInfo = `${visitInfo}Location Name: ${this.location.name} - `;
        // }
         if (this.patientId && this.patient) {
            visitInfo = `${visitInfo}Patient Name: ${this.patient.user.displayName}`;
         }

        // visitInfo = `${visitInfo}Patient Name: ${this.patient.user.displayName} - Case Id: ${this.caseId} - `;

        // if (this.doctorId && this.doctor) {
        //     visitInfo = `${visitInfo}Attorney Name: ${this.doctor.user.displayName}`;
        //     if (this.specialtyId && this.specialty) {
        //         visitInfo = `${visitInfo} - Speciality: ${this.specialty.name}`;
        //     }
        // }
        // if (this.roomId && this.room) {
        //     visitInfo = `${visitInfo}Room Name: ${this.room.name}`;
        //     if (this.room.roomTest) {
        //         visitInfo = `${visitInfo} - Test: ${this.room.roomTest.name}`;
        //     }
        // }

        // if (this.eventStart) {
        //     visitInfo = `${visitInfo} - Visit Start: ${this.eventStart.local().format('MMMM Do YYYY,h:mm:ss a')}`;
        // }

        return visitInfo;
    }

    get eventColor(): string {
        //  if (this.room && this.roomId) {
        //      return this.room.roomTest.color;
        //  } else if (this.doctor && this.doctorId) {
        //      return this.specialty ? this.specialty.color : '';
        //  } else {
        return '';
    }

    // let colorCodes: any = ['#7A3DB8', '#7AB83D', '#CC6666', '#7AFF7A', '#FF8000'];
    // // let color: any = _.sample(colorCodes);
    // if (this.doctorId) {
    //     return '#7A3DB8';
    // } else {
    //     return '#CC6666';
    // }
    // return color;

}
