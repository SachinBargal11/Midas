import { IEventWrapper } from './i-event-wrapper';
import { ScheduledEventInstance } from './scheduled-event-instance';
import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import * as RRule from 'rrule';

const LeaveEventRecord = Record({
    id: 0,
    eventStart: null,
    eventEnd: null
});

export class LeaveEvent extends LeaveEventRecord {

    id: number;
    eventStart: moment.Moment;
    eventEnd: moment.Moment;

    constructor(props) {
        super(props);
    }
}
