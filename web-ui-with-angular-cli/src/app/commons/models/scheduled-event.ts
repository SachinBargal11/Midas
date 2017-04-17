import { IEventWrapper } from './i-event-wrapper';
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
    recurrenceId: null,
    recurrenceRule: null,
    recurrenceException: [],
    isAllDay: false,
    isCancelled: false,
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
    recurrenceId: number;
    recurrenceRule: RRule.RRule;
    recurrenceException: Array<moment.Moment>;
    isAllDay: boolean;
    isCancelled: boolean;
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

    get isSeries(): boolean {
        return this.recurrenceRule ? true : false;
    }

    get isChangedInstanceOfSeries(): boolean {
        return !this.recurrenceRule && this.recurrenceId ? true : false;
    }

    get isSeriesOrInstanceOfSeries(): boolean {
        return this.isSeries || this.isChangedInstanceOfSeries;
    }

    isSeriesStartedInBefore(thisDay: moment.Moment): boolean {
        return moment(this.recurrenceRule.options.dtstart).isBefore(thisDay, 'day');
    }

    get isSeriesStartedInPast(): boolean {
        return moment(this.recurrenceRule.options.dtstart).isBefore(moment());
    }

    getEventInstances(eventWrapper: IEventWrapper): ScheduledEventInstance[] {
        let instances: ScheduledEventInstance[];
        if (this.recurrenceRule) {
            let occurrences: Date[] = this.recurrenceRule.all((date: Date, index: number) => {
                if (index > 500) {
                    return false;
                }
                return true;
            });
            let duration: number = (this.eventEnd ? this.eventEnd : this.eventStart.clone().endOf('day')).diff(this.eventStart);
            instances = _.chain(occurrences).filter((occurrence: Date) => {
                return _.find(this.recurrenceException, (exception: moment.Moment) => {
                    return moment(occurrence).isSame(exception, 'day');
                }) ? false : true;
            }).map((occurrence: Date) => {
                return new ScheduledEventInstance({
                    title: this.name,
                    allDay: this.isAllDay,
                    start: moment(occurrence).local(),
                    end: moment(occurrence).add(duration).local(),
                    owningEvent: this,
                    eventWrapper: eventWrapper,
                    eventColor: '#378006'
                });
            }).value();
        } else {
            instances = [
                new ScheduledEventInstance({
                    title: this.name,
                    allDay: this.isAllDay,
                    start: this.eventStart ? this.eventStart.clone().local() : null,
                    end: this.eventEnd ? this.eventEnd.clone().local() : null,
                    owningEvent: this,
                    eventWrapper: eventWrapper,
                    eventColor: '#378006'
                })
            ];
        }
        return instances;
    }
}
