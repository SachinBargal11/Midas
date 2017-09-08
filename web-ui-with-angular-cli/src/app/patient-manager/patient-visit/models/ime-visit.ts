import { Case } from '../../cases/models/case';
import { IEventWrapper } from '../../../commons/models/i-event-wrapper';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import * as RRule from 'rrule';
import { VisitStatus } from './enums/visit-status';
import { Patient } from '../../../patient-manager/patients/models/patient';

const ImeVisitRecord = Record({
    id: 0,
    calendarEventId: 0,
    // location: null,
    // locationId: 0,
    isImeVisitType: true,
    case: null,
    caseId: 0,
    patient: null,
    patientId: 0,
    doctorName: '',
    transportProviderId: null,
    eventStart: null,
    eventEnd: null,
    notes: '',
    visitStatusId: VisitStatus.SCHEDULED,
    calendarEvent: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null,//Moment
    VisitCreatedByCompanyId: null,
});


export class ImeVisit extends ImeVisitRecord {

    id: number;
    calendarEventId: number;
    // location: Location;
    // locationId: number;
    isImeVisitType: boolean;
    case: Case;
    caseId: number;
    patient: Patient;
    patientId: number;
    doctorName: string;
    transportProviderId: number;
    eventStart: moment.Moment;
    eventEnd: moment.Moment;
    notes: string;
    visitStatusId: VisitStatus;
    calendarEvent: ScheduledEvent;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    VisitCreatedByCompanyId: number;

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

    get eventColor(): string {
        return '#FF8000';
    }

    get visitDisplayString(): string {
        let visitInfo: string = ``;

        if (this.patientId && this.caseId && this.patient) {
            visitInfo = `${visitInfo}Patient Name: ${this.patient.user.firstName} ${this.patient.user.lastName} - Case Id: ${this.caseId}  `;
        }

        if (this.eventStart) {
            visitInfo = `${visitInfo} - Visit Start: ${this.eventStart.local().format('MMMM Do YYYY,h:mm:ss a')}`;
        }
        return visitInfo;
    }
}