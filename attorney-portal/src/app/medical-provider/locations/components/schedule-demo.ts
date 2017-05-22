import { Observable } from 'rxjs/Rx';
import { ScheduleDetail } from '../models/schedule-detail';
import { ScheduleStore } from '../stores/schedule-store';
import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventStore } from '../stores/event-store';
import * as $ from 'jquery';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { MyEvent } from '../models/my-event';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';

@Component({
    selector: 'schedule-demo',
    templateUrl: './schedule-demo.html'
})

export class ScheduleDemo implements OnInit {

    events: any[];

    header: any;

    event: MyEvent;

    dialogVisible: boolean = false;

    idGen: number = 100;

    constructor(
        private _eventStore: EventStore,
        private cd: ChangeDetectorRef, 
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService) { }

    ngOnInit() {
        this.loadEvents();

        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }
    loadEvents() {
        this._progressBarService.show();
        this._eventStore.getEvents()
            .subscribe(
                (events) => {
                    this.events = events;
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
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;

        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    }

    handleEventClick(e) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;

        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }

    saveEvent() {
        // update
        if (this.event.id) {
                let result = this._eventStore.updateEvent(this.event);
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
                let result = this._eventStore.addEvent(this.event);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadEvents();
                        this._notificationsStore.addNotification(notification);
                        this.event = null;
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

    deleteEvent() {
                let result = this._eventStore.deleteEvent(this.event);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadEvents();
                        this._notificationsStore.addNotification(notification);
                    },
                    (error) => {
                        let errString = 'Unable to delete event!';
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
        this.dialogVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }
}

