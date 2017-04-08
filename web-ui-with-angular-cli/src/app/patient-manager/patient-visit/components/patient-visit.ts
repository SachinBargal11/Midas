import { DoctorSpeciality } from '../../../medical-provider/users/models/doctor-speciality';

import { DoctorLocationSchedule } from '../../../medical-provider/users/models/doctor-location-schedule';
import { ScheduleDetail } from '../../../medical-provider/locations/models/schedule-detail';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ConfirmationService } from 'primeng/primeng';
import { NotificationsService } from 'angular2-notifications';

import { Schedule } from '../../../medical-provider/rooms/models/rooms-schedule';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Patient } from '../../patients/models/patient';
import { PatientVisit } from '../models/patient-visit';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { PatientsStore } from '../../patients/stores/patients-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { ScheduleStore } from '../../../medical-provider/locations/stores/schedule-store';
import { RoomScheduleStore } from '../../../medical-provider/rooms/stores/rooms-schedule-store';
import { DoctorLocationScheduleStore } from '../../../medical-provider/users/stores/doctor-location-schedule-store';
import { PatientVisitsStore } from '../stores/patient-visit-store';
import { RoomsService } from '../../../medical-provider/rooms/services/rooms-service';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { Speciality } from '../../../account-setup/models/speciality';
import { ScheduledEventEditorComponent } from '../../../medical-provider/calendar/components/scheduled-event-editor';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
import { SpecialityService } from '../../../account-setup/services/speciality-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';

import { ScheduledEvent } from '../../../commons/models/scheduled-event';

import * as RRule from 'rrule';

@Component({
    selector: 'patient-visit',
    templateUrl: './patient-visit.html'

})


export class PatientVisitComponent implements OnInit {

    @ViewChild(ScheduledEventEditorComponent)
    private _scheduledEventEditorComponent: ScheduledEventEditorComponent;

    @ViewChild('cd')
    private _confirmationDialog: any;

    events: ScheduledEventInstance[];
    header: any;
    views: any;
    patients: Patient[];
    specialities: Speciality[];
    tests: Tests[];
    rooms: Room[];
    doctorLocationSchedules: DoctorLocationSchedule[];
    roomSchedule: Schedule;
    doctorSchedule: Schedule;
    eventDialogVisible: boolean = false;
    visitDialogVisible: boolean = false;
    patientScheduleForm: FormGroup;
    patientScheduleFormControls;
    patientVisitForm: FormGroup;
    patientVisitFormControls;
    selectedVisit: PatientVisit;
    selectedCalEvent: ScheduledEventInstance;
    selectedLocationId: number = 0;
    selectedDoctorId: number = 0;
    selectedRoomId: number = 0;
    selectedOption: number = 0;
    selectedTestId: number = 0;
    selectedSpecialityId: number = 0;

    isFormValidBoolean: boolean = false;
    isSaveProgress: boolean = false;

    private scheduledEventEditorValid: boolean = false;
    businessHours: any[];
    hiddenDays: any = [];

    // weekends: boolean = true;
    eventRenderer: Function = (event, element) => {
        if (event.owningEvent.recurrenceId) {
            element.find('.fc-content').prepend('<i class="fa fa-exclamation-circle"></i>&nbsp;');
        } else if (event.owningEvent.recurrenceRule) {
            element.find('.fc-content').prepend('<i class="fa fa-refresh"></i>&nbsp;');
        }
    }
    dayRenderer: Function = (date, cell) => {
        // console.log(date);
        // console.log(cell);
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
        private _scheduleStore: ScheduleStore,
        private _roomScheduleStore: RoomScheduleStore,
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
        private _progressBarService: ProgressBarService,
        private _notificationsStore: NotificationsStore,
        private _confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private _roomsService: RoomsService,
        private _specialityService: SpecialityService
    ) {
        this.patientScheduleForm = this._fb.group({
            patientId: ['', Validators.required]
        });
        this.patientScheduleFormControls = this.patientScheduleForm.controls;

        this.patientVisitForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: ['']
        });
        this.patientVisitFormControls = this.patientVisitForm.controls;


    }
    ngOnInit() {
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek,listDay'
        };
        this.views = {
            listDay: { buttonText: 'list day' },
            listWeek: { buttonText: 'list week' }
        };

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._locationsStore.getLocations();
        });
        this._locationsStore.getLocations();
        this._patientsStore.getPatientsWithOpenCases();
        this._roomsService.getTests()
            .subscribe(tests => { this.tests = tests; });
        this._specialityService.getSpecialities()
            .subscribe(specialities => { this.specialities = specialities; });
    }

    isFormValid() {
        if (this.scheduledEventEditorValid && this.patientScheduleForm.valid) {
            return true;
        } else {
            return false;
        }
    }

    selectLocation() {
        if (this.selectedLocationId == 0) {
            this.selectedOption = 0;
            this.selectedDoctorId = 0;
            this.selectedRoomId = 0;
            this.selectedSpecialityId = 0;
            this.selectedTestId = 0;
            this.events = [];
        } else {
            this.loadLocationVisits();
            if (this.selectedOption == 1) {
                this._doctorLocationScheduleStore.getDoctorLocationSchedulesByLocationId(this.selectedLocationId);
            } else if (this.selectedOption == 2) {
                this._roomsStore.getRooms(this.selectedLocationId);
            }
        }
    }

    selectRoom() {
        this.selectedSpecialityId = 0;
        this.selectedDoctorId = 0;
        this.events = [];
        if (this.selectedRoomId != 0) {
            this.loadLocationRoomVisits();
            this.fetchRoomSchedule();
        }
    }

    selectDoctor() {
        this.selectedRoomId = 0;
        this.selectedTestId = 0;
        this.events = [];
        if (this.selectedDoctorId != 0) {
            this.loadLocationDoctorVisits();
            this.fetchDoctorSchedule();
        }
    }

    selectTest() {
        if (this.selectedTestId) {
            let rooms: Room[] = this._roomsStore.rooms.getValue().toArray();
            this.rooms = _.filter(rooms, (currentRoom: Room) => {
                return currentRoom.roomTest.id == this.selectedTestId;
            });
        }
    }

    selectSpeciality() {
        if (this.selectedSpecialityId) {
            let doctorLocationSchedules: DoctorLocationSchedule[] = this._doctorLocationScheduleStore.doctorLocationSchedules.getValue().toArray();
            this.doctorLocationSchedules = _.filter(doctorLocationSchedules, (currentDoctorLocationSchedule: DoctorLocationSchedule) => {
                let matchedSpeciality: DoctorSpeciality = _.find(currentDoctorLocationSchedule.doctor.doctorSpecialities, (currentSpeciality: DoctorSpeciality) => {
                    return currentSpeciality.speciality.id == this.selectedSpecialityId;
                });
                return matchedSpeciality ? true : false;
            });
        }
    }

    fetchRoomSchedule() {
        let fetchRoom = this._roomsStore.getRoomById(this.selectedRoomId);
        fetchRoom.subscribe((results) => {
            let room: Room = results;
            let scheduleId: number = room.schedule.id;
            this._scheduleStore.fetchScheduleById(scheduleId)
                .subscribe((schedule: Schedule) => {
                    this.roomSchedule = schedule;
                    this.updateAvaibility(this.roomSchedule.scheduleDetails);
                });
        });
    }

    updateAvaibility(scheduleDetails: ScheduleDetail[]) {
        let businessHours: any = [];
        businessHours = _.chain(scheduleDetails)
            .filter((currentScheduleDetail: ScheduleDetail) => {
                return currentScheduleDetail.scheduleStatus === 1;
            })
            .groupBy((currentRoomSchedule: ScheduleDetail) => {
                return `${currentRoomSchedule.slotStart ? currentRoomSchedule.slotStart.format('HH:mm') : '00:00'} - ${currentRoomSchedule.slotEnd ? currentRoomSchedule.slotEnd.format('HH:mm') : '23:59'}`;
            }).map((timewiseGroup: Array<ScheduleDetail>) => {
                let firstScheduleDetail: ScheduleDetail = timewiseGroup[0];
                return {
                    dow: _.map(timewiseGroup, (currentScheduleDetail: ScheduleDetail) => {
                        return currentScheduleDetail.dayofWeek - 1;
                    }),
                    start: firstScheduleDetail.slotStart ? firstScheduleDetail.slotStart.format('HH:mm') : '00:00',
                    end: firstScheduleDetail.slotEnd ? firstScheduleDetail.slotEnd.format('HH:mm') : '23:59'
                };
            }).value();
        this.businessHours = businessHours;
    }



    fetchDoctorSchedule() {
        let fetchDoctorLocationSchedule = this._doctorLocationScheduleStore.getDoctorLocationScheduleByDoctorIdAndLocationId(this.selectedDoctorId, this.selectedLocationId);
        fetchDoctorLocationSchedule.subscribe((results) => {
            let doctorSchedule: DoctorLocationSchedule = results;
            let scheduleId: number = doctorSchedule.schedule.id;
            this._scheduleStore.fetchScheduleById(scheduleId)
                .subscribe((schedule: Schedule) => {
                    this.doctorSchedule = schedule;
                    this.updateAvaibility(this.doctorSchedule.scheduleDetails);
                });
        });
    }


    selectOption() {
        if (this.selectedOption == 1) {
            this._doctorLocationScheduleStore.getDoctorLocationSchedulesByLocationId(this.selectedLocationId);
            this.selectDoctor();
        } else if (this.selectedOption == 2) {
            this._roomsStore.getRooms(this.selectedLocationId);
            this.selectRoom();
        }

    }

    loadVisits() {
        if (this.selectedOption == 1) {
            this.loadLocationDoctorVisits();
        } else if (this.selectedOption == 2) {
            this.loadLocationRoomVisits();
        } else {
            this.loadLocationVisits();
        }
    }

    getVisitOccurrences(visits) {
        let occurrences: ScheduledEventInstance[] = [];
        let calendarEvents: ScheduledEvent[] = _.chain(visits)
            .map((visit: PatientVisit) => {
                return visit.calendarEvent;
            })
            .unique((event: ScheduledEvent) => {
                return event.id;
            })
            .value();
        _.forEach(calendarEvents, (event: ScheduledEvent) => {
            occurrences.push(...event.getEventInstances(null));
        });
        _.forEach(occurrences, (occurrence: ScheduledEventInstance) => {
            let matchingVisits: PatientVisit[] = _.filter(visits, (currentVisit: PatientVisit) => {
                return currentVisit.calendarEvent.id === occurrence.owningEvent.id;
            });
            let visitForOccurrence: PatientVisit = _.find(matchingVisits, (currentMatchingVisit: PatientVisit) => {
                if (!currentMatchingVisit.isOriginalVisit) {
                    return currentMatchingVisit.eventStart.isSame(occurrence.start, 'day');
                }
                return false;
            });
            if (visitForOccurrence) {
                occurrence.eventWrapper = visitForOccurrence;
            } else {
                let originalVisit: PatientVisit = _.find(matchingVisits, (currentMatchingVisit: PatientVisit) => {
                    return currentMatchingVisit.isOriginalVisit;
                });
                occurrence.eventWrapper = originalVisit;
            }
            return occurrence;
        });
        occurrences = _.filter(occurrences, (occurrence: ScheduledEventInstance) => {
            return !occurrence.eventWrapper.calendarEvent.isCancelled;
        });
        return occurrences;
    }

    loadLocationDoctorVisits() {
        this._progressBarService.show();
        this._patientVisitsStore.getPatientVisitsByLocationAndDoctorId(this.selectedLocationId, this.selectedDoctorId)
            .subscribe(
            (visits: PatientVisit[]) => {
                this.events = this.getVisitOccurrences(visits);
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
            (visits: PatientVisit[]) => {
                this.events = this.getVisitOccurrences(visits);
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
            (visits: PatientVisit[]) => {
                this.events = this.getVisitOccurrences(visits);
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

    closeEventDialog() {
        this.eventDialogVisible = false;
        this.handleEventDialogHide();
    }

    closePatientVisitDialog() {
        this.visitDialogVisible = false;
        this.handleVisitDialogHide();
    }

    handleEventDialogHide() {
        this.selectedVisit = null;
    }

    handleVisitDialogHide() {
        this.selectedVisit = null;
    }

    handleDayClick(event) {
        let considerTime: boolean = true;
        if (event.view.name == 'month') {
            considerTime = false;
        }
        let canScheduleAppointement: boolean = true;
        if (!this.selectedOption) {
            canScheduleAppointement = false;
            this._notificationsService.alert('', 'Please select visit type!');
        } else if (this.selectedOption == 1) {
            if (!this.selectedDoctorId) {
                canScheduleAppointement = false;
                this._notificationsService.alert('', 'Please select Doctor!');
            } else {
                if (this.doctorSchedule) {
                    let scheduleDetails: ScheduleDetail[] = this.doctorSchedule.scheduleDetails;
                    let matchingScheduleDetail: ScheduleDetail = _.find(scheduleDetails, (currentScheduleDetail: ScheduleDetail) => {
                        return currentScheduleDetail.isInAllowedSlot(event.date, considerTime);
                    });
                    if (!matchingScheduleDetail) {
                        canScheduleAppointement = false;
                        this._notificationsService.alert('', 'You cannot schedule an appointment on this day!');
                    }
                }
            }
        } else if (this.selectedOption == 2) {
            if (!this.selectedRoomId) {
                canScheduleAppointement = false;
                this._notificationsService.alert('', 'Please select Room!');
            } else {
                if (this.roomSchedule) {
                    let scheduleDetails: ScheduleDetail[] = this.roomSchedule.scheduleDetails;
                    let matchingScheduleDetail: ScheduleDetail = _.find(scheduleDetails, (currentScheduleDetail: ScheduleDetail) => {
                        return currentScheduleDetail.isInAllowedSlot(event.date, considerTime);
                    });
                    if (!matchingScheduleDetail) {
                        canScheduleAppointement = false;
                        this._notificationsService.alert('', 'You cannot schedule an appointment on this day!');
                    }
                }
            }
        }
        if (canScheduleAppointement) {
            this.selectedVisit = new PatientVisit({
                locationId: this.selectedLocationId,
                doctorId: this.selectedOption == 1 ? this.selectedDoctorId : null,
                roomId: this.selectedOption == 2 ? this.selectedRoomId : null,
                calendarEvent: new ScheduledEvent({
                    name: '',
                    eventStart: event.date.clone().local(),
                    eventEnd: event.date.clone().local().add(30, 'minutes'),
                    timezone: '',
                    isAllDay: false
                })
            });
            this.eventDialogVisible = true;
            this._cd.detectChanges();
        }
    }

    handleEventClick(event) {
        let eventInstance: ScheduledEventInstance = event.calEvent;
        let owningEvent: ScheduledEvent = eventInstance.owningEvent;
        let eventWrapper: PatientVisit = <PatientVisit>(eventInstance.eventWrapper);
        this.selectedCalEvent = eventInstance;

        if (eventInstance.start.isBefore(moment())) {
            if (owningEvent.recurrenceId) {
                // Edit Visit Instance
                this.selectedVisit = new PatientVisit(_.extend(eventWrapper.toJS(), {
                    calendarEvent: owningEvent
                }));
            } else {
                // Create Visit Instance 
                if (!eventWrapper.isOriginalVisit) {
                    this.selectedVisit = new PatientVisit(_.extend(eventWrapper.toJS(), {
                        eventStart: moment.utc(eventInstance.start),
                        eventEnd: moment.utc(eventInstance.end),
                        calendarEvent: owningEvent
                    }));
                } else {
                    this.selectedVisit = new PatientVisit(_.extend(eventWrapper.toJS(), {
                        id: 0,
                        eventStart: moment.utc(eventInstance.start),
                        eventEnd: moment.utc(eventInstance.end),
                        calendarEvent: owningEvent
                    }));
                }

            }
            this.visitDialogVisible = true;

        } else {
            this.selectedVisit = new PatientVisit(_.extend(eventWrapper.toJS(), {
                calendarEvent: owningEvent
            }));
            if (this.selectedVisit.calendarEvent.recurrenceRule || this.selectedVisit.calendarEvent.recurrenceId) {
                this.confirm();
            } else {
                this.eventDialogVisible = true;
            }
        }
    }

    confirm() {
        this._confirmationService.confirm({
            message: 'Do you want to edit/cancel only this event occurrence or the whole series?',
            accept: () => {
                if (this.selectedVisit.calendarEvent.recurrenceRule) {
                    let seriesSelectedEvent: ScheduledEvent = this.selectedVisit.calendarEvent;
                    this.selectedVisit = new PatientVisit({
                        locationId: this.selectedLocationId,
                        doctorId: this.selectedOption == 1 ? this.selectedDoctorId : null,
                        roomId: this.selectedOption == 2 ? this.selectedRoomId : null,
                        calendarEvent: new ScheduledEvent(_.extend(seriesSelectedEvent.toJS(), {
                            id: (!seriesSelectedEvent.recurrenceRule && seriesSelectedEvent.recurrenceId) ? seriesSelectedEvent.id : 0,
                            eventStart: this.selectedCalEvent.start,
                            eventEnd: this.selectedCalEvent.end,
                            recurrenceId: seriesSelectedEvent.id,
                            recurrenceRule: null,
                            recurrenceException: []
                        }))
                    });
                }
                this.eventDialogVisible = true;
            },
            reject: () => {
                if (!this.selectedVisit.calendarEvent.recurrenceRule && this.selectedVisit.calendarEvent.recurrenceId) {
                    let eventId = this.selectedVisit.calendarEvent.recurrenceId;
                    this.selectedVisit = this._patientVisitsStore.findPatientVisitByCalendarEventId(eventId);
                }
                this.eventDialogVisible = true;
            }
        });
    }

    saveVisit() {
        let patientVisitFormValues = this.patientVisitForm.value;
        let updatedVisit: PatientVisit;
        updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            notes: patientVisitFormValues.notes,
            visitStatusId: patientVisitFormValues.visitStatusId
        }));
        let result = this._patientVisitsStore.updatePatientVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Event updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.loadVisits();
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
        this.visitDialogVisible = false;
    }

    cancelCurrentOccurrence() {
        if (this.selectedVisit.calendarEvent.recurrenceRule) {
            let seriesSelectedEvent: ScheduledEvent = this.selectedVisit.calendarEvent;
            this.selectedVisit = new PatientVisit({
                patientId: this.selectedVisit.patientId,
                locationId: this.selectedLocationId,
                doctorId: this.selectedOption == 1 ? this.selectedDoctorId : null,
                roomId: this.selectedOption == 2 ? this.selectedRoomId : null,
                calendarEvent: new ScheduledEvent(_.extend(seriesSelectedEvent.toJS(), {
                    id: (!seriesSelectedEvent.recurrenceRule && seriesSelectedEvent.recurrenceId) ? seriesSelectedEvent.id : 0,
                    eventStart: this.selectedCalEvent.start,
                    eventEnd: this.selectedCalEvent.end,
                    recurrenceId: seriesSelectedEvent.id,
                    recurrenceRule: null,
                    recurrenceException: []
                }))
            });
        }
        this._progressBarService.show();
        let result = this._patientVisitsStore.cancelPatientVisit(this.selectedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Event cancelled successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.loadVisits();
                this._notificationsStore.addNotification(notification);
            },
            (error) => {
                let errString = 'Unable to cancel event!';
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
        this._confirmationDialog.hide();
    }

    cancelSeries() {
        if (!this.selectedVisit.calendarEvent.recurrenceRule && this.selectedVisit.calendarEvent.recurrenceId) {
            let eventId = this.selectedVisit.calendarEvent.recurrenceId;
            this.selectedVisit = this._patientVisitsStore.findPatientVisitByCalendarEventId(eventId);
        }
        if (moment(this.selectedVisit.calendarEvent.recurrenceRule.options.dtstart).isBefore(moment())) {
            let rrule: RRule;
            rrule = new RRule(_.extend({}, this.selectedVisit.calendarEvent.recurrenceRule.origOptions, {
                count: 0,
                until: this.selectedCalEvent.start.utc().toDate()
            }));
            let updatedvisit: PatientVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
                calendarEvent: new ScheduledEvent(_.extend(this.selectedVisit.calendarEvent.toJS(), {
                    recurrenceRule: rrule
                }))
            }));
            this._progressBarService.show();
            let result = this._patientVisitsStore.updateCalendarEvent(updatedvisit);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Event cancelled successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this.loadVisits();
                    this._notificationsStore.addNotification(notification);
                },
                (error) => {
                    let errString = 'Unable to cancel event!';
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
            this._progressBarService.show();
            let result = this._patientVisitsStore.cancelCalendarEvent(this.selectedVisit);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Event cancelled successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this.loadVisits();
                    this._notificationsStore.addNotification(notification);
                },
                (error) => {
                    let errString = 'Unable to cancel event!';
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
        this._confirmationDialog.hide();

    }

    saveEvent() {
        let patientScheduleFormValues = this.patientScheduleForm.value;
        let updatedEvent: ScheduledEvent = this._scheduledEventEditorComponent.getEditedEvent();
        console.log(updatedEvent);
        let updatedVisit: PatientVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            patientId: patientScheduleFormValues.patientId,
            calendarEvent: updatedEvent
        }));
        if (updatedVisit.id) {
            if (moment(this.selectedVisit.calendarEvent.recurrenceRule.options.dtstart).isBefore(this.selectedCalEvent.start, 'day')) {
                let endDate: Date = this.selectedVisit.calendarEvent.recurrenceRule.before(this.selectedCalEvent.start.startOf('day').toDate());
                let rrule: RRule;
                rrule = new RRule(_.extend({}, this.selectedVisit.calendarEvent.recurrenceRule.origOptions, {
                    count: 0,
                    until: endDate
                }));
                let updatedvisitWithRecurrence: PatientVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
                    calendarEvent: new ScheduledEvent(_.extend(this.selectedVisit.calendarEvent.toJS(), {
                        recurrenceRule: rrule
                    }))
                }));
                this._progressBarService.show();
                let result = this._patientVisitsStore.updateCalendarEvent(updatedvisitWithRecurrence);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event cancelled successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadVisits();
                        this._notificationsStore.addNotification(notification);
                    },
                    (error) => {
                        let errString = 'Unable to cancel event!';
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
                // Add New Visit
                // Change the recurrence rule of selected event to start with selected date from the form 
                // but end on same date as selected Visit rule.
                // new series should start from selected/clicked date
                let occurrences: Date[] = this.selectedVisit.calendarEvent.recurrenceRule.all();
                let until: Date = moment(occurrences[occurrences.length - 1]).set({ 'hour': updatedVisit.calendarEvent.eventStart.hour(), 'minute': updatedVisit.calendarEvent.eventStart.minute() }).toDate();
                let eventStart: Date = this.selectedCalEvent.start.set({ 'hour': updatedVisit.calendarEvent.eventStart.hour(), 'minute': updatedVisit.calendarEvent.eventStart.minute() }).toDate();
                let eventEnd: Date = this.selectedCalEvent.end.set({ 'hour': updatedVisit.calendarEvent.eventEnd.hour(), 'minute': updatedVisit.calendarEvent.eventEnd.minute() }).toDate();
                rrule = new RRule(_.extend({}, updatedVisit.calendarEvent.recurrenceRule.origOptions, {
                    count: 0,
                    dtstart: eventStart,
                    until: until
                }));

                let updatedAddNewVisit: PatientVisit = new PatientVisit(_.extend(updatedVisit.toJS(), {
                    id: 0,
                    calendarEventId: 0,
                    calendarEvent: new ScheduledEvent(_.extend(updatedVisit.calendarEvent.toJS(), {
                        id: 0,
                        eventStart: moment(eventStart),
                        eventEnd: moment(eventEnd),
                        recurrenceRule: rrule
                    }))
                }));
                let addVisitResult = this._patientVisitsStore.addPatientVisit(updatedAddNewVisit);
                addVisitResult.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadVisits();
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
            } else {
                let result = this._patientVisitsStore.updatePatientVisit(updatedVisit);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event updated successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadVisits();
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
        } else {
            if (updatedVisit.calendarEvent.recurrenceId) {
                let exceptionResult: Observable<{ exceptionVisit: PatientVisit, recurringEvent: ScheduledEvent }> = this._patientVisitsStore.createExceptionInRecurringEvent(updatedVisit);
                exceptionResult.subscribe(
                    (response: { exceptionVisit: PatientVisit, recurringEvent: ScheduledEvent }) => {

                        let notification = new Notification({
                            'title': `Occurrence for recurring event ${response.recurringEvent.name} created for ${response.exceptionVisit.calendarEvent.eventStart.format('M d, yy')}`,
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this.loadVisits();
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
                        this.loadVisits();
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
        this.eventDialogVisible = false;
    }
}
