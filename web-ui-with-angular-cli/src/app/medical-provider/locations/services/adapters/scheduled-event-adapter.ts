import { ScheduledEvent } from '../../../../commons/models/scheduled-event';
import * as moment from 'moment';
import * as RRule from 'rrule';
import * as _ from 'underscore';

export class ScheduledEventAdapter {
    static parseResponse(data: any): ScheduledEvent {

        let recurrenceRule: RRule.RRule = null;

        if (data.recurrenceRule) {
            let options = RRule.parseString(data.recurrenceRule);
            options.dtstart = moment.utc(data.eventStart).toDate();
            recurrenceRule = new RRule(options);
        }
        let exceptions = [];
        if (data.recurrenceException) {
            let exceptionsInString = data.recurrenceException.split(',');
            exceptions = _.map(exceptionsInString, (datum: any) => {
                return moment(datum);
            });
        }

        let scheduledEvent: ScheduledEvent = new ScheduledEvent({
            id: data.id,
            name: data.name,
            eventStart: data.eventStart ? moment.utc(data.eventStart) : null,
            eventEnd: data.eventEnd ? moment.utc(data.eventEnd) : null,
            timezone: data.timezone,
            description: data.description,
            recurrenceRule: recurrenceRule,
            recurrenceId: data.recurrenceId,
            recurrenceException: exceptions,
            isAllDay: data.isAllDay ? true : false,
            isCancelled: data.isCancelled ? true : false,
            isDeleted: data.isDeleted ? true : false,
            createByUserID: data.createbyuserID,
            createDate: data.createDate ? moment.utc(data.createDate) : null,
            updateByUserID: data.updateByUserID,
            updateDate: data.updateDate ? moment.utc(data.updateDate) : null
        });
        return scheduledEvent;
    }

}