import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { ScheduledEventStore } from '../stores/scheduled-event-store';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html'
})


export class CalendarComponent implements OnInit {

    events: ScheduledEventInstance[];
    header: any;
    dialogVisible: boolean = false;
    selectedEvent: any;
    startDate: Date;

    constructor(
        private _router: Router,
        private _cd: ChangeDetectorRef,
        private _sessionStore: SessionStore,
        private _scheduledEventStore: ScheduledEventStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService
    ) {
    }

    ngOnInit() {
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        this.loadEvents();
    }

    loadEvents() {
        this._progressBarService.show();
        this._scheduledEventStore.getEvents()
            .subscribe(
            (events: ScheduledEvent[]) => {
                let occurrences: ScheduledEventInstance[] = [];
                _.forEach(events, (event: ScheduledEvent) => {
                    occurrences.push(...event.getEventInstances());
                });
                this.events = occurrences;
                console.log(this.events);
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    handleDayClick(event) {
        this.selectedEvent = null;
        this.dialogVisible = true;
        this._cd.detectChanges();
    }

    handleEventClick(event) {
        console.log(event.calEvent);
        let owningEvent: ScheduledEvent = event.calEvent.owningEvent;
        this.selectedEvent = _.extend(owningEvent.toJS(), {
            eventStart: owningEvent.eventStartAsDate,
            eventEnd: owningEvent.eventEndAsDate
        });
        
        this.dialogVisible = true;
    }
}
