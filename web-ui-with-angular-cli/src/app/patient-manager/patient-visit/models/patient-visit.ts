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
import { Patient } from '../../../patient-manager/patients/models/patient';

const PatientVisitRecord = Record({
    id: 0,
    calendarEventId: 0,
    locationId: null,
    case: null,
    caseId: 0,
    patient: null,
    patientId: 0,
    room: null,
    roomId: null,
    doctor: null,
    doctorId: null,
    specialtyId: null,
    eventStart: null,
    eventEnd: null,
    notes: '',
    visitStatusId: VisitStatus.SCHEDULED,
    visitType: 0,
    calendarEvent: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});


export class PatientVisit extends PatientVisitRecord implements IEventWrapper {

    id: number;
    calendarEventId: number;
    locationId: number;
    case: Case;
    caseId: number;
    patient: Patient;
    patientId: number;
    room: Room;
    roomId: number;
    doctor: Doctor;
    doctorId: number;
    specialtyId: number;
    eventStart: moment.Moment;
    eventEnd: moment.Moment;
    notes: string;
    visitStatusId: VisitStatus;
    visitType: number;
    calendarEvent: ScheduledEvent;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

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
        let visitInfo: string = `Visit`;
        if (this.patientId && this.caseId) {
            visitInfo = `${visitInfo} - ${this.patient.user.displayName} - Case(${this.caseId})`;
        }
        if (this.doctorId && this.doctor) {
            visitInfo = `${visitInfo} - Doctor(${this.doctor.user.displayName})`;
        }
        if (this.roomId && this.room) {
            visitInfo = `${visitInfo} - Room(${this.room.name})`;
        }
        return visitInfo;
    }

    get eventColor(): string {
        let colorCodes: any = ['#7A3DB8', '#7AB83D', '#CC6666', '#7AFF7A', '#FF8000'];
        let color: any = _.sample(colorCodes);
        debugger;
        return color;
    }
}
