import { ScheduledEvent } from './scheduled-event';
import * as moment from 'moment';

export class ScheduledEventInstance {
    title: string;
    start: moment.Moment;
    end: moment.Moment;
    timezone: string;
    description: string;
    allDay: boolean;
    owningEvent: ScheduledEvent;

    constructor(props: {
        title: string;
        start: moment.Moment;
        end: moment.Moment;
        timezone?: string;
        description?: string;
        allDay: boolean;
        owningEvent: ScheduledEvent;
    }) {
        this.title = props.title;
        this.start = props.start;
        this.end = props.end;
        this.timezone = props.timezone;
        this.allDay = props.allDay;
        this.owningEvent = props.owningEvent;
    }
}
