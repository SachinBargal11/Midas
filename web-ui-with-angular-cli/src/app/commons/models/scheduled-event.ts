import { ScheduledEventInstance } from './scheduled-event-instance';
import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import * as RRule from 'rrule';

const ScheduledEventRecord = Record({
    id: 0,
    name: '',
    eventStart: null,
    eventEnd: null,
    timezone: '',
    description: '',
    recurrenceRule: null,
    recurrenceException: '',
    isAllDay: false,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class ScheduledEvent extends ScheduledEventRecord {

    id: number;
    name: string;
    eventStart: moment.Moment;
    eventEnd: moment.Moment;
    timezone: string;
    description: string;
    recurrenceRule: RRule.RRule;
    recurrenceException: string;
    isAllDay: boolean;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

    get eventStartAsDate(): Date {
        return this.eventStart ? this.eventStart.toDate() : null;
    }

    get eventEndAsDate(): Date {
        return this.eventEnd ? this.eventEnd.toDate() : null;
    }

    getEventInstances(): ScheduledEventInstance[] {
        let instaces: ScheduledEventInstance[];
        if (this.recurrenceRule) {
            let occurrences: Date[] = this.recurrenceRule.all();
            let duration: number = (this.eventEnd ? this.eventEnd : this.eventStart.clone().endOf('day')).diff(this.eventStart);
            instaces = _.map(occurrences, (occurrence: Date) => {
                return new ScheduledEventInstance({
                    title: this.name,
                    allDay: this.isAllDay,
                    start: moment(occurrence),
                    end: moment(occurrence).add(duration),
                    owningEvent: this
                });
            });
        } else {
            instaces = [
                new ScheduledEventInstance({
                    title: this.name,
                    allDay: this.isAllDay,
                    start: this.eventStart ? this.eventStart.clone() : null,
                    end: this.eventEnd ? this.eventEnd.clone() : null,
                    owningEvent: this
                })
            ];
        }
        return instaces;
    }
}
