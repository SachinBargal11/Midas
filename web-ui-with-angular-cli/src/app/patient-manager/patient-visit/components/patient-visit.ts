import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import * as _ from 'underscore';
import { ConfirmationService } from 'primeng/primeng';
import { PatientVisit } from '../models/patient-visit';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { PatientsStore } from '../../patients/stores/patients-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';

import { RoomScheduleStore } from '../../../medical-provider/rooms/stores/rooms-schedule-store';
import { DoctorLocationScheduleStore } from '../../../medical-provider/users/stores/doctor-location-schedule-store';
import { PatientVisitsStore } from '../stores/patient-visit-store';

import { ScheduledEventEditorComponent } from '../../../medical-provider/calendar/components/scheduled-event-editor';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';

import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';

import { ScheduledEvent } from '../../../commons/models/scheduled-event';

@Component({
    selector: 'patient-visit',
    templateUrl: './patient-visit.html'
})


export class PatientVisitComponent implements OnInit {

    @ViewChild(ScheduledEventEditorComponent)
    private _scheduledEventEditorComponent: ScheduledEventEditorComponent;
    events: ScheduledEventInstance[];
    header: any;
    dialogVisible: boolean = false;
    patientVisitForm: FormGroup;
    patientVisitFormControls;
    selectedVisit: PatientVisit;

    selectedLocationId: number;
    selectedDoctorId: number;
    selectedRoomId: number;
    selectedOption: number = 1;
    selectedPatient: number;

    private scheduledEventEditorValid: boolean = false;
    eventRenderer: Function = (event, element) => {
        if (event.owningEvent.recurrenceId) {
            element.find('.fc-content').prepend('<i class="fa fa-exclamation-circle"></i>&nbsp;');
        } else if (event.owningEvent.recurrenceRule) {
            element.find('.fc-content').prepend('<i class="fa fa-refresh"></i>&nbsp;');
        }
    }

    constructor(
        public _route: ActivatedRoute,
        private _fb: FormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        private _sessionStore: SessionStore,
        private _patientVisitsStore: PatientVisitsStore,
        private _patientsStore: PatientsStore,
        private _roomsStore: RoomsStore,
        private _doctorsStore: DoctorsStore,
        private _locationsStore: LocationsStore,
        private _roomScheduleStore: RoomScheduleStore,
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
        private _progressBarService: ProgressBarService,
        private _notificationsStore: NotificationsStore,
        private _confirmationService: ConfirmationService
    ) {
        this.patientVisitForm = this._fb.group({
            patientId: ['', Validators.required]
        });
        this.patientVisitFormControls = this.patientVisitForm.controls;
    }
    ngOnInit() {
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        // this.loadVisits();
        this._locationsStore.getLocations();
    }

    isFormValid() {
        if (this.scheduledEventEditorValid && this.patientVisitForm.valid) {
            return true;
        } else {
            return false;
        }
    }

    selectLocation(event) {
        this.loadLocationVisits();
        if (this.selectedOption === 1) {
            this._doctorLocationScheduleStore.getDoctorLocationSchedulesByLocationId(this.selectedLocationId);
        } else if (this.selectedOption === 2) {
            this._roomsStore.getRooms(this.selectedLocationId);
        }
    }

    selectRoom(event) {
        this.loadLocationRoomVisits();
    }

    selectDoctor(event) {
        this.loadLocationDoctorVisits();
    }

    loadLocationDoctorVisits() {
        this._progressBarService.show();
        this._patientVisitsStore.getPatientVisitsByLocationAndDoctorId(this.selectedLocationId, this.selectedDoctorId)
            .subscribe(
            (events: PatientVisit[]) => {
                let occurrences: ScheduledEventInstance[] = [];
                _.forEach(events, (event: PatientVisit) => {
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

    loadLocationRoomVisits() {
        this._progressBarService.show();
        this._patientVisitsStore.getPatientVisitsByLocationAndRoomId(this.selectedLocationId, this.selectedRoomId)
            .subscribe(
            (events: PatientVisit[]) => {
                let occurrences: ScheduledEventInstance[] = [];
                _.forEach(events, (event: PatientVisit) => {
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

    loadLocationVisits() {
        this._progressBarService.show();
        this._patientVisitsStore.getPatientVisitsByLocationId(this.selectedLocationId)
            .subscribe(
            (events: PatientVisit[]) => {
                let occurrences: ScheduledEventInstance[] = [];
                _.forEach(events, (event: PatientVisit) => {
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

    closeDialog() {
        this.dialogVisible = false;
    }

    handleDialogHide() {
        this.selectedVisit = null;
    }

    handleDayClick(event) {
        this.selectedVisit = new PatientVisit({
            locationId: this.selectedLocationId,
            doctorId: this.selectedOption === 1 ? this.selectedDoctorId : 0,
            roomId: this.selectedOption === 1 ? this.selectedRoomId : 0,
            calendarEvent: new ScheduledEvent({
                name: '',
                eventStart: event.date,
                eventEnd: event.date,
                timezone: '',
                isAllDay: false
            })
        });
        this.dialogVisible = true;
        this._cd.detectChanges();
    }

    handleEventClick(event) {
        let owningEvent: ScheduledEvent = event.calEvent.owningEvent;
        let eventWrapper: PatientVisit = event.calEvent.eventWrapper;
        this.selectedVisit = new PatientVisit(_.extend(eventWrapper.toJS(), {
            calendarEvent: owningEvent
        }));
        if (this.selectedVisit.calendarEvent.recurrenceRule || this.selectedVisit.calendarEvent.recurrenceId) {
            this.confirm(event);
        } else {
            this.dialogVisible = true;
        }
    }

    confirm(event) {
        this._confirmationService.confirm({
            message: 'Do you want to edit only this event occurrence or the whole series?',
            accept: () => {
                if (this.selectedVisit.calendarEvent.recurrenceRule) {
                    let seriesSelectedEvent: ScheduledEvent = this.selectedVisit.calendarEvent;
                    this.selectedVisit = new PatientVisit({
                        locationId: this.selectedLocationId,
                        doctorId: this.selectedOption === 1 ? this.selectedDoctorId : 0,
                        roomId: this.selectedOption === 1 ? this.selectedRoomId : 0,
                        calendarEvent: new ScheduledEvent(_.extend(seriesSelectedEvent.toJS(), {
                            id: (!seriesSelectedEvent.recurrenceRule && seriesSelectedEvent.recurrenceId) ? seriesSelectedEvent.id : 0,
                            eventStart: event.calEvent.start,
                            eventEnd: event.calEvent.end,
                            recurrenceId: seriesSelectedEvent.id,
                            recurrenceRule: null,
                            recurrenceException: []
                        }))
                    });
                }
                this.dialogVisible = true;
            },
            reject: () => {
                if (!this.selectedVisit.calendarEvent.recurrenceRule && this.selectedVisit.calendarEvent.recurrenceId) {
                    let eventId = this.selectedVisit.calendarEvent.recurrenceId;
                    this.selectedVisit = this._patientVisitsStore.findPatientVisitById(eventId);
                }
                this.dialogVisible = true;
            }
        });
    }

    saveEvent() {
        let updatedEvent: ScheduledEvent = this._scheduledEventEditorComponent.getEditedEvent();
        console.log(updatedEvent);
        let updatedVisit: PatientVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            patientId: this.selectedPatient,
            calendarEvent: updatedEvent
        }));
        if (updatedVisit.id) {
            let result = this._patientVisitsStore.updatePatientVisit(updatedVisit);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Event updated successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    // this.loadVisits();
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
        } else {
            if (updatedVisit.calendarEvent.recurrenceId) {
                let exceptionResult: Observable<{ exceptionEvent: ScheduledEvent, recurringEvent: ScheduledEvent }> = this._patientVisitsStore.createExceptionInRecurringEvent(updatedVisit);
                exceptionResult.subscribe(
                    (response: { exceptionEvent: ScheduledEvent, recurringEvent: ScheduledEvent }) => {
                        let notification = new Notification({
                            'title': `Occurrence for recurring event ${response.recurringEvent.name} created for ${response.exceptionEvent.eventStart.format('M d, yy')}`,
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        // this.loadVisits();
                        this._notificationsStore.addNotification(notification);
                        // this.event = null;
                    },
                    (error) => {
                        let errString = 'Unable to add event!';
                        let notification = new Notification({
                            'messages': `Unable to create occurrence for recurring event ${updatedEvent.name} created for ${updatedEvent.eventStart.format('M d, yy')}`,
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            } else {
                let result = this._patientVisitsStore.addPatientVisit(updatedVisit);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        // this.loadVisits();
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
        }
        this.dialogVisible = false;
    }
}
