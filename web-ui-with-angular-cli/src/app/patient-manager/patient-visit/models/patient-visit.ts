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

const PatientVisitRecord = Record({
    id: 0,
    calendarEventId: 0,
    caseId: 0,
    patientId: 0,
    locationId: null,
    roomId: null,
    room:null,
    doctor:null,
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
    caseId: number;
    room:Room;
    doctor:Doctor;
    patientId: number;
    locationId: number;
    roomId: number;
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
}
