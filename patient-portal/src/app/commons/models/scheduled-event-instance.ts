import { PatientVisit } from '../../patient-manager/patient-visit/models/patient-visit';
import { ScheduledEvent } from './scheduled-event';
import { IEventWrapper } from './i-event-wrapper';
import * as moment from 'moment';

export class ScheduledEventInstance {
    title: string;
    start: moment.Moment;
    end: moment.Moment;
    timezone: string;
    description: string;
    allDay: boolean;
    owningEvent: ScheduledEvent;
    eventWrapper: IEventWrapper;

    constructor(props: {
        title: string;
        start: moment.Moment;
        end: moment.Moment;
        timezone?: string;
        description?: string;
        allDay: boolean;
        owningEvent: ScheduledEvent;
        eventWrapper: IEventWrapper;
    }) {
        this.title = props.title;
        this.start = props.start;
        this.end = props.end;
        this.timezone = props.timezone;
        this.allDay = props.allDay;
        this.owningEvent = props.owningEvent;
        this.eventWrapper = props.eventWrapper;
    }

    get isInPast():boolean {
        return this.start.isBefore(moment());
    }
    get color(): string {
        return this.eventWrapper ? this.eventWrapper.eventColor : null;
    }
}
