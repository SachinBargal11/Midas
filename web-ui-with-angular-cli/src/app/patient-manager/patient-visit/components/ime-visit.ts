import { Procedure } from '../../../commons/models/procedure';
import { DiagnosisCode } from '../../../commons/models/diagnosis-code';
import { User } from '../../../commons/models/user';
import { Case } from '../../cases/models/case';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { environment } from '../../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { DoctorSpeciality } from '../../../medical-provider/users/models/doctor-speciality';
import { DoctorLocationSchedule } from '../../../medical-provider/users/models/doctor-location-schedule';
import { ScheduleDetail } from '../../../medical-provider/locations/models/schedule-detail';
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
import { LeaveEventEditorComponent } from '../../../medical-provider/calendar/components/leave-event-editor';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
import { SpecialityService } from '../../../account-setup/services/speciality-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Document } from '../../../commons/models/document';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { LeaveEvent } from '../../../commons/models/leave-event';
import { VisitDocument } from '../../patient-visit/models/visit-document';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as RRule from 'rrule';
import { ProcedureStore } from '../../../commons/stores/procedure-store';
import { VisitReferralStore } from '../stores/visit-referral-store';
import { VisitReferral } from '../models/visit-referral';
import { AncillaryMasterStore } from '../../../account-setup/stores/ancillary-store';
import { AncillaryMaster } from '../../../account-setup/models/ancillary-master';

@Component({
    selector: 'ime-visit',
    templateUrl: './ime-visit.html'
})


export class ImeVisitComponent implements OnInit {

    @ViewChild(ScheduledEventEditorComponent)
    private _scheduledEventEditorComponent: ScheduledEventEditorComponent;

    @ViewChild(LeaveEventEditorComponent)
    private _leaveEventEditorComponent: LeaveEventEditorComponent;

    @ViewChild('cd')
    private _confirmationDialog: any;

    /* Data Lists */
    patients: Patient[] = [];
    rooms: Room[] = [];
    doctorLocationSchedules: {
        doctorLocationSchedule: DoctorLocationSchedule,
        speciality: DoctorSpeciality
    }[] = [];
    roomSchedule: Schedule;
    doctorSchedule: Schedule;

    /* Selections */
    selectedVisit: PatientVisit;
    selectedCalEvent: ScheduledEventInstance;
    selectedLocationId: number = 0;
    selectedDoctorId: number = 0;
    selectedRoomId: number = 0;
    selectedOption: number = 0;
    selectedTestId: number = 0;
    selectedMode: number = 0;
    selectedSpecialityId: number = 0;
    outOfOfficeVisits: any;

    /* Dialog Visibilities */
    eventDialogVisible: boolean = false;
    visitDialogVisible: boolean = false;

    /* Form Controls */
    private scheduledEventEditorValid: boolean = false;
    private leaveEventEditorValid: boolean = false;
    isFormValidBoolean: boolean = false;
    imeScheduleForm: FormGroup;
    imeScheduleFormControls;
    addNewPatientForm: FormGroup;
    addNewPatientFormControls;
    imeVisitForm: FormGroup;
    imeVisitFormControls;

    /* Calendar Component Configurations */
    events: ScheduledEventInstance[];
    header: any;
    views: any;
    businessHours: any[];
    hiddenDays: any = [];
    defaultView: string = 'month';
    visitUploadDocumentUrl: string;
    private _url: string = `${environment.SERVICE_BASE_URL}`;

    documents: VisitDocument[] = [];
    selectedDocumentList = [];
    isDeleteProgress: boolean = false;

    visitInfo: string = 'Appointment For Investigate Medical Expert';
    isAddNewPatient: boolean = false;
    isGoingOutOffice: boolean = false;
    isProcedureCode: boolean = false;
    procedures: Procedure[];
    selectedProcedures: Procedure[];
    selectedSpeciality: Speciality;
    readingDoctors: Doctor[];
    readingDoctor = 0;
    visitId: number;
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;
    doctorId: number = this.sessionStore.session.user.id;

    eventRenderer: Function = (event, element) => {
        // if (event.owningEvent.isUpdatedInstanceOfRecurringSeries) {
        //     element.find('.fc-content').prepend('<i class="fa fa-exclamation-circle"></i>&nbsp;');
        // } else if (event.owningEvent.recurrenceRule) {
        //     element.find('.fc-content').prepend('<i class="fa fa-refresh"></i>&nbsp;');
        // }
        let content: string = '';
        if (event.owningEvent.isUpdatedInstanceOfRecurringSeries) {
            content = `<i class="fa fa-exclamation-circle"></i>`;
        } else if (event.owningEvent.recurrenceRule) {
            content = `<i class="fa fa-refresh"></i>`;
        }
        content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">${event.eventWrapper.patient.user.displayName}</span>`;
        // if (event.eventWrapper.isOutOfOffice) {
        //     content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">Out of office</span>`;
        // } else {
        //     if (!event.eventWrapper.isOutOfOffice) {
        // content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">${event.eventWrapper.patient.user.displayName}</span>`;
        //     }
        // }
        element.find('.fc-content').html(content);
    }

    isSaveProgress: boolean = false;
    ancillaryProviderId: number = null;
    allPrefferesAncillaries: AncillaryMaster[];
    referredBy: string = '';
    private _selectedEvent: ScheduledEvent;
    eventStartAsDate: Date;
    eventEndAsDate: Date;
    duration: number;
    isAllDay: boolean;
    repeatType: string = '7';
    name: string = 'Appointment for IME ';


    scheduledEventEditorForm: FormGroup;
    scheduledEventEditorFormControls;
    @Output() isValid = new EventEmitter();

    @Input() set selectedEvent(value: ScheduledEvent) {
        if (value) {
            this._selectedEvent = value;
            this.name = this._selectedEvent.name;
            this.eventStartAsDate = this._selectedEvent.eventStartAsDate;
            this.duration = moment.duration(this._selectedEvent.eventEnd.diff(this._selectedEvent.eventStart)).asMinutes();
            this.eventEndAsDate = this._selectedEvent.eventEndAsDate;
            this.isAllDay = this._selectedEvent.isAllDay;
            this.ancillaryProviderId = this._selectedEvent.ancillaryProviderId;
            this.referredBy = '';

        } else {
            this._selectedEvent = null;
            this.eventStartAsDate = null;
            this.eventEndAsDate = null;
            this.isAllDay = false;
        }
    }

    get selectedEvent(): ScheduledEvent {
        return this._selectedEvent;
    }

    constructor(
        public _route: ActivatedRoute,
        private _fb: FormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        public sessionStore: SessionStore,
        private _patientVisitsStore: PatientVisitsStore,
        private _patientsStore: PatientsStore,
        private _roomsStore: RoomsStore,
        private _doctorsStore: DoctorsStore,
        public locationsStore: LocationsStore,
        private _scheduleStore: ScheduleStore,
        private _roomScheduleStore: RoomScheduleStore,
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
        private _progressBarService: ProgressBarService,
        private _notificationsStore: NotificationsStore,
        private _confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private _roomsService: RoomsService,
        private _specialityService: SpecialityService,
        private _procedureStore: ProcedureStore,
        private _visitReferralStore: VisitReferralStore,
        private confirmationService: ConfirmationService,
        private _ancillaryMasterStore: AncillaryMasterStore,
    ) {
        this.imeScheduleForm = this._fb.group({
            patientId: ['', Validators.required],
            notes: [''],
            name: ['', Validators.required],
            doctorName:['', Validators.required],
            eventStartDate: ['', Validators.required],
            eventStartTime: [''],
            duration: ['', Validators.required],
            ancillaryProviderId: [''],
        });
        this.loadPrefferdAncillaries();

        this.imeScheduleFormControls = this.imeScheduleForm.controls;

        this.imeVisitForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: [''],
            readingDoctor: ['']
        });

        this.imeVisitFormControls = this.imeVisitForm.controls;
    }

    loadPrefferdAncillaries() {
        // this._progressBarService.show();
        this._ancillaryMasterStore.getAncillaryMasters()
            .subscribe((allPrefferesAncillaries: AncillaryMaster[]) => {
                this.allPrefferesAncillaries = allPrefferesAncillaries;
            },
            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }

    ngOnInit() {
        this.loadVisits();
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek,listDay'
        };
        this.views = {
            listDay: { buttonText: 'list day' },
            listWeek: { buttonText: 'list week' }
        };

        this._patientsStore.getOpenCasesByCompanyWithPatient()
              .subscribe(
                (patient: Patient[]) => {
                    this.patients = patient;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
    
    }

    getEditedEvent(): ScheduledEvent {
        let scheduledEventEditorFormValues = this.scheduledEventEditorForm.value;
        let recurrenceRule: RRule;
        let recurrenceString: string = null;

        return new ScheduledEvent(_.extend(this.selectedEvent.toJS(), {
            name: scheduledEventEditorFormValues.name,
            eventStart: moment(this.eventStartAsDate),
            eventEnd: moment(this.eventStartAsDate).add(this.duration, 'minutes'),
            timezone: this.eventStartAsDate.getTimezoneOffset(),
            ancillaryProviderId: parseInt(scheduledEventEditorFormValues.ancillaryProviderId)
        }));
    }

    isFormValid() {
        if (this.scheduledEventEditorValid && this.imeScheduleForm.valid) {
            return true;
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
        this.outOfOfficeVisits = _.filter(visits, (currentVisit: any) => {
            return currentVisit.isOutOfOffice;
        })
        visits = _.reject(visits, (currentVisit: any) => {
            return currentVisit.isOutOfOffice;
        })
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
        this.imeScheduleForm.reset();
    }

    closePatientVisitDialog() {
        this.visitDialogVisible = false;
        this.handleVisitDialogHide();
        this.imeVisitForm.reset();
    }

    handleEventDialogHide() {
        this.selectedVisit = null;
    }

    handleVisitDialogHide() {
        this.selectedVisit = null;
    }

    private _validateAppointmentCreation(event): boolean {
        let considerTime: boolean = true;
        if (event.view.name == 'month') {
            considerTime = false;
        }

        let canScheduleAppointement: boolean = true;

        return canScheduleAppointement;
    }

    handleDayClick(event) {
        this.eventDialogVisible = false;
        this.imeScheduleForm.reset();
        this.selectedVisit = null;
        let canScheduleAppointement: boolean = this._validateAppointmentCreation(event);

        if (canScheduleAppointement) {

            this.selectedVisit = new PatientVisit({
                calendarEvent: new ScheduledEvent({
                    name: '',
                    eventStart: event.date.clone().local(),
                    eventEnd: event.date.clone().local().add(30, 'minutes'),
                    timezone: '',
                    isAllDay: false
                }),
                createByUserID: this.sessionStore.session.account.user.id
            });
            // this.visitInfo = this.selectedVisit.visitDisplayString;
            this.eventDialogVisible = true;
            this._cd.detectChanges();
        }
    }

    handleEventClick(event) {
        let clickedEventInstance: ScheduledEventInstance = event.calEvent;
        let scheduledEventForInstance: ScheduledEvent = clickedEventInstance.owningEvent;
        let patientVisit: PatientVisit = <PatientVisit>(clickedEventInstance.eventWrapper);
        this.selectedCalEvent = clickedEventInstance;
        Object.keys(this.imeScheduleForm.controls).forEach(key => {
            this.imeScheduleForm.controls[key].setValidators(null);
            this.imeScheduleForm.controls[key].updateValueAndValidity();
        });
        if (clickedEventInstance.isInPast) {
            // this.visitUploadDocumentUrl = this._url + '/fileupload/multiupload/' + this.selectedVisit.id + '/visit';
            this.visitUploadDocumentUrl = this._url + '/documentmanager/uploadtoblob';
            this.getDocuments();
            this.visitDialogVisible = true;
        } else {
            if (scheduledEventForInstance.isSeriesOrInstanceOfSeries) {
                // this.confirmEditingEventOccurance();
            } else {
                this.eventDialogVisible = true;
            }
        }
    }

    saveVisit() {
        let imeVisitFormValues = this.imeVisitForm.value;
        let updatedVisit: PatientVisit;
        updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            notes: imeVisitFormValues.notes,
            visitStatusId: imeVisitFormValues.visitStatusId,
            doctorId: this.selectedOption == 2 ? parseInt(imeVisitFormValues.readingDoctor) : this.selectedVisit.doctorId
        }));
        let result = this._patientVisitsStore.updatePatientVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                this.selectedVisit = response;
                let notification = new Notification({
                    'title': 'Event updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.loadVisits();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Event updated successfully');
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
        this.visitDialogVisible = true;
    }

    cancelAppointment() {
        this._progressBarService.show();
        let result = this._patientVisitsStore.deletePatientVisit(this.selectedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Appointment cancelled successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.eventDialogVisible = false;
                this.loadVisits();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Appointment cancelled successfully!');
            },
            (error) => {
                let errString = 'Unable to cancel appointment!';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this._progressBarService.hide();
            });
        this._confirmationDialog.hide();
    }

    private _getUpdatedVisitWithSeriesTerminatedOn(visit: PatientVisit, terminateOn: moment.Moment): PatientVisit {
        let rrule: RRule;
        rrule = new RRule(_.extend({}, visit.calendarEvent.recurrenceRule.origOptions, {
            count: 0,
            until: terminateOn.toDate()
        }));
        let updatedvisit: PatientVisit = new PatientVisit(_.extend(visit.toJS(), {
            calendarEvent: new ScheduledEvent(_.extend(visit.calendarEvent.toJS(), {
                recurrenceRule: rrule
            }))
        }));

        return updatedvisit;
    }

    saveEvent() {

        let imeScheduleFormValues = this.imeScheduleForm.value;
        let updatedEvent: ScheduledEvent;
        let leaveEvent: LeaveEvent;
        let procedureCodes = [];
        if (this.selectedProcedures) {
            this.selectedProcedures.forEach(currentProcedureCode => {
                procedureCodes.push({ 'procedureCodeId': currentProcedureCode.id });
            });
        }
        if (!this.isGoingOutOffice) {
            updatedEvent = this._scheduledEventEditorComponent.getEditedEvent();
        } else {
            leaveEvent = this._leaveEventEditorComponent.getEditedEvent();
        }
        let updatedVisit: PatientVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            patientId: leaveEvent ? null : imeScheduleFormValues.patientId,
            specialtyId: this.selectedOption == 1 ? this.selectedSpecialityId : null,
            calendarEvent: updatedEvent ? updatedEvent : this.selectedVisit.calendarEvent,
            isOutOfOffice: this.isGoingOutOffice,
            leaveStartDate: leaveEvent ? leaveEvent.eventStart : null,
            leaveEndDate: leaveEvent ? leaveEvent.eventEnd : null,
            ancillaryProviderId: updatedEvent ? updatedEvent.ancillaryProviderId : null,
            notes: imeScheduleFormValues.notes,
            doctorName: imeScheduleFormValues.doctorName,
            patientVisitProcedureCodes: this.selectedProcedures ? procedureCodes : [],
            createByUserID: this.sessionStore.session.account.user.id
        }));
        if (updatedVisit.id) {
            if (this.selectedVisit.calendarEvent.isSeriesStartedInBefore(this.selectedCalEvent.start)) {
                let endDate: Date = this.selectedVisit.calendarEvent.recurrenceRule.before(this.selectedCalEvent.start.startOf('day').toDate());
                let updatedvisitWithRecurrence: PatientVisit = this._getUpdatedVisitWithSeriesTerminatedOn(this.selectedVisit, moment(endDate));
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
                let occurrences: Date[] = this.selectedVisit.calendarEvent.recurrenceRule.all();
                let until: Date = moment(occurrences[occurrences.length - 1]).set({ 'hour': updatedVisit.calendarEvent.eventStart.hour(), 'minute': updatedVisit.calendarEvent.eventStart.minute() }).toDate();
                let eventStart: Date = this.selectedCalEvent.start.set({ 'hour': updatedVisit.calendarEvent.eventStart.hour(), 'minute': updatedVisit.calendarEvent.eventStart.minute() }).toDate();
                let eventEnd: Date = this.selectedCalEvent.end.set({ 'hour': updatedVisit.calendarEvent.eventEnd.hour(), 'minute': updatedVisit.calendarEvent.eventEnd.minute() }).toDate();
                let rrule = new RRule(_.extend({}, updatedVisit.calendarEvent.recurrenceRule.origOptions, {
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
                    })),
                    createByUserID: this.sessionStore.session.account.user.id
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
            if (updatedVisit.calendarEvent.isChangedInstanceOfSeries) {
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
        this.handleEventDialogHide();
    }

    getDocuments() {
        this._progressBarService.show();
        this._patientVisitsStore.getDocumentsForVisitId(this.selectedVisit.id)
            .subscribe(document => {
                this.documents = document;
            },

            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    documentUploadComplete(documents: Document[]) {
        _.forEach(documents, (currentDocument: Document) => {
            if (currentDocument.status == 'Failed') {
                let notification = new Notification({
                    'title': currentDocument.message + '  ' + currentDocument.documentName,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', currentDocument.message);
            } else if (currentDocument.status == 'Success') {
                let notification = new Notification({
                    'title': 'Document uploaded successfully',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Document uploaded successfully');
                this.addConsentDialogVisible = false;
            }
        });
        this.getDocuments();
    }

    documentUploadError(error: Error) {
        if (error.message == 'Please select document Type') {
            this._notificationsService.error('Oh No!', 'Please select document Type');
        }
        else {
            this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
        }
    }

    showDialog(currentCaseId: number) {
        this.addConsentDialogVisible = true;
        this.selectedCaseId = currentCaseId;
    }

    downloadPdf(documentId) {
        this._progressBarService.show();
        this._patientVisitsStore.downloadDocumentForm(this.visitId, documentId)
            .subscribe(
            (response) => {
                // this.document = document
                // window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);
            },
            (error) => {
                let errString = 'Unable to download';
                let notification = new Notification({
                    'messages': 'Unable to download',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                //  this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', 'Unable to download');
            },
            () => {
                this._progressBarService.hide();
            });
        this._progressBarService.hide();
    }

    deleteDocument() {
        if (this.selectedDocumentList.length > 0) {
            // this.confirmationService.confirm({
            //     message: 'Do you want to delete this record?',
            //     header: 'Delete Confirmation',
            //     icon: 'fa fa-trash',
            //     accept: () => {

            this.selectedDocumentList.forEach(currentCase => {
                this._progressBarService.show();
                this.isDeleteProgress = true;
                this._patientVisitsStore.deleteDocument(currentCase)
                    .subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'record deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()

                        });
                        this.getDocuments();
                        this._notificationsStore.addNotification(notification);
                        this.selectedDocumentList = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete record';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedDocumentList = [];
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                    });
            });
            //     }
            // });
        } else {
            let notification = new Notification({
                'title': 'select record to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select record to delete');
        }
    }

}