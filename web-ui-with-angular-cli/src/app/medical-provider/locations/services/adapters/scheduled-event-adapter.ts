import { ScheduledEvent } from '../../../../commons/models/scheduled-event';
import * as moment from 'moment';
import * as RRule from 'rrule';

export class ScheduledEventAdapter {
    static parseResponse(data: any): ScheduledEvent {
        let scheduledEvent: ScheduledEvent = new ScheduledEvent({
            id: data.id,
            name: data.name,
            eventStart: data.eventStart ? moment.utc(data.eventStart) : null,
            eventEnd: data.eventEnd ? moment.utc(data.eventEnd) : null,
            timezone: data.timezone,
            description: data.description,
            recurrenceRule: data.recurrenceRule ? RRule.fromString(data.recurrenceRule) : null,
            recurrenceException: data.recurrenceException,
            isAllDay: data.isAllDay ? true : false,
            isDeleted: data.isDeleted ? true : false,
            createByUserID: data.createbyuserID,
            createDate: data.createDate ? moment.utc(data.createDate) : null,
            updateByUserID: data.updateByUserID,
            updateDate: data.updateDate ? moment.utc(data.updateDate) : null
        });
        return scheduledEvent;
    }

}