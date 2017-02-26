import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { ScheduledEventStore } from '../stores/scheduled-event-store';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { ScheduledEventEditorComponent } from './scheduled-event-editor';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html'
})


export class CalendarComponent implements OnInit {

    @ViewChild(ScheduledEventEditorComponent)
    private _scheduledEventEditorComponent: ScheduledEventEditorComponent;
    events: ScheduledEventInstance[];
    header: any;
    dialogVisible: boolean = false;
    selectedEvent: ScheduledEvent;
    startDate: Date;
    calendarForm: FormGroup;
    calendarFormControls;
    private scheduledEventEditorValid: boolean = false;

    constructor(
        private _router: Router,
        private _fb: FormBuilder,
        private _cd: ChangeDetectorRef,
        private _sessionStore: SessionStore,
        private _scheduledEventStore: ScheduledEventStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService
    ) {
        this.calendarForm = this._fb.group({

        });
        this.calendarFormControls = this.calendarForm.controls;
    }

    isFormValid() {
        if (this.scheduledEventEditorValid && this.calendarForm.valid) {
            return true;
        } else {
            return false;
        }
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

    handleDialogHide() {
        this.selectedEvent = null;
    }

    handleDayClick(event) {
        this.selectedEvent = new ScheduledEvent({
            name: '',
            eventStart: event.date,
            eventEnd: event.date,
            timezone: '',
            isAllDay: false
        });
        this.dialogVisible = true;
        this._cd.detectChanges();
    }

    handleEventClick(event) {
        console.log(event.calEvent);
        let owningEvent: ScheduledEvent = event.calEvent.owningEvent;
        this.selectedEvent = owningEvent;
        this.dialogVisible = true;
    }

    saveEvent() {
        let updatedEvent: ScheduledEvent = this._scheduledEventEditorComponent.getEditedEvent();
        console.log(updatedEvent);
        if (updatedEvent.id) {
            let result = this._scheduledEventStore.updateEvent(updatedEvent);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Event updated successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this.loadEvents();
                    this._notificationsStore.addNotification(notification);
                },
                (error) => {
                    let errString = 'Unable to update event!';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this._progressBarService.hide();
                    this._notificationsStore.addNotification(notification);
                },
                () => {
                    this._progressBarService.hide();
                });
        }
        // new
        else {
            let result = this._scheduledEventStore.addEvent(updatedEvent);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Event added successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this.loadEvents();
                    this._notificationsStore.addNotification(notification);
                    // this.event = null;
                },
                (error) => {
                    let errString = 'Unable to add event!';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this._progressBarService.hide();
                    this._notificationsStore.addNotification(notification);
                },
                () => {
                    this._progressBarService.hide();
                });
        }

        this.dialogVisible = false;
    }
}
