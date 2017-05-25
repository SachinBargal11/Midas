import { ScheduledEvent } from './scheduled-event';
export interface IEventWrapper {
    calendarEvent: ScheduledEvent;
    readonly eventColor: string;
}
