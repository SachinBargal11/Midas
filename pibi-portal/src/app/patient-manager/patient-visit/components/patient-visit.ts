import { Procedure } from '../../../commons/models/procedure';
import { DiagnosisCode } from '../../../commons/models/diagnosis-code';
import { User } from '../../../commons/models/user';
import { Case } from '../../cases/models/case';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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

@Component({
    selector: 'patient-visit',
    templateUrl: './patient-visit.html',
    styleUrls: ['./patient-visit.scss']
})

export class PatientVisitComponent implements OnInit {

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

    /* Dialog Visibilities */
    eventDialogVisible: boolean = false;
    visitDialogVisible: boolean = false;

    /* Form Controls */
    private scheduledEventEditorValid: boolean = false;
    private leaveEventEditorValid: boolean = false;
    isFormValidBoolean: boolean = false;
    patientScheduleForm: FormGroup;
    patientScheduleFormControls;
    addNewPatientForm: FormGroup;
    addNewPatientFormControls;
    patientVisitForm: FormGroup;
    patientVisitFormControls;

    /* Calendar Component Configurations */
    events: ScheduledEventInstance[];
    header: any;
    views: any;
    businessHours: any[];
    hiddenDays: any = [];
    defaultView: string = 'agendaDay';
    visitUploadDocumentUrl: string;
    private _url: string = `${environment.SERVICE_BASE_URL}`;

    documents: VisitDocument[] = [];
    selectedDocumentList = [];
    isDeleteProgress: boolean = false;

    visitInfo: string = '';
    isAddNewPatient: boolean = false;
    isGoingOutOffice: boolean = false;
    isProcedureCode: boolean = false;
    procedures: Procedure[];
    selectedProcedures: Procedure[];
    selectedSpeciality: Speciality;


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
        element.find('.fc-content').html(content);
    }

    isSaveProgress: boolean = false;

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
        private confirmationService: ConfirmationService
    ) {
        this.patientScheduleForm = this._fb.group({
            patientId: ['', Validators.required],
            isAddNewPatient: [''],
            isGoingOutOffice: [''],
            isProcedureCode: ['']
        });
        this.patientScheduleFormControls = this.patientScheduleForm.controls;

        this.addNewPatientForm = this._fb.group(this.patientFormControlModel());

        this.addNewPatientFormControls = this.addNewPatientForm.controls;

        this.patientVisitForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: ['']
        });
        this.patientVisitFormControls = this.patientVisitForm.controls;
    }

    patientFormControlModel() {
        const model = {
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]]
        };
        return model;
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

        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.locationsStore.getLocations();
        });
        this.locationsStore.getLocations();
        this._patientsStore.getPatientsWithOpenCases();
    }

    isFormValid() {
        let validFormForProcedure: boolean = false;
        if (this.selectedSpeciality) {
            if (this.selectedSpeciality.mandatoryProcCode) {
                if (this.selectedProcedures) {
                    if (this.selectedProcedures.length > 0) {
                        validFormForProcedure = true;
                    }
                }
            } else {
                validFormForProcedure = true;
            }
        } else if (this.selectedTestId > 0) {
            if (this.selectedProcedures) {
                if (this.selectedProcedures.length > 0) {
                    validFormForProcedure = true;
                }
            }
        }
        if (this.scheduledEventEditorValid && this.patientScheduleForm.valid && validFormForProcedure && !this.isGoingOutOffice) {
            return true;
        } else if (this.isGoingOutOffice && this.leaveEventEditorValid) {
            return true;
        } else {
            return false;
        }
    }


    loadProceduresForSpeciality(specialityId: number) {
        this._progressBarService.show();
        let result = this._procedureStore.getProceduresBySpecialityId(specialityId);
        result.subscribe(
            (procedures: Procedure[]) => {
                // this.procedures = procedures;
                let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
                    return currentProcedure.id;
                });
                let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
                    return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
                });
                this.procedures = procedureDetails;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadProceduresForRoomTest(roomTestId: number) {
        this._progressBarService.show();
        let result = this._procedureStore.getProceduresByRoomTestId(roomTestId);
        result.subscribe(
            (procedures: Procedure[]) => {
                // this.procedures = procedures;
                let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
                    return currentProcedure.id;
                });
                let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
                    return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
                });
                this.procedures = procedureDetails;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    fetchSelectedSpeciality(specialityId: number) {
        this._progressBarService.show();
        let result = this._specialityService.getSpeciality(specialityId);
        result.subscribe(
            (speciality: Speciality) => {
                this.selectedSpeciality = speciality;
                if (speciality.mandatoryProcCode) {
                    this.isProcedureCode = true;
                }
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    selectLocation() {
        if (this.selectedLocationId == 0) {
            this.selectedMode = 0;
            this.selectedOption = 0;
            this.selectedDoctorId = 0;
            this.selectedRoomId = 0;
            this.selectedSpecialityId = 0;
            this.selectedTestId = 0;
            this.events = [];
        } else {
            this.loadLocationVisits();
            this._doctorLocationScheduleStore.getDoctorLocationSchedulesByLocationId(this.selectedLocationId)
                .subscribe((doctorLocationSchedules: DoctorLocationSchedule[]) => {
                    let mappedDoctorLocationSchedules: {
                        doctorLocationSchedule: DoctorLocationSchedule,
                        speciality: DoctorSpeciality
                    }[] = [];
                    _.forEach(doctorLocationSchedules, (currentDoctorLocationSchedule: DoctorLocationSchedule) => {
                        _.forEach(currentDoctorLocationSchedule.doctor.doctorSpecialities, (currentSpeciality: DoctorSpeciality) => {
                            mappedDoctorLocationSchedules.push({
                                doctorLocationSchedule: currentDoctorLocationSchedule,
                                speciality: currentSpeciality
                            });
                        });
                    });
                    this.doctorLocationSchedules = mappedDoctorLocationSchedules;
                }, error => {
                    this.doctorLocationSchedules = [];
                });
            this._roomsStore.getRooms(this.selectedLocationId)
                .subscribe((rooms: Room[]) => {
                    this.rooms = rooms;
                }, error => {
                    this.rooms = [];
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

    selectOption(event) {
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedOption = 0;
        this.events = [];
        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOption = 1;
            this.selectedDoctorId = parseInt(event.target.value);
            this.selectedSpecialityId = parseInt(event.target.selectedOptions[0].getAttribute('data-specialityId'));
            this.loadLocationDoctorVisits();
            this.fetchDoctorSchedule();
            this.fetchSelectedSpeciality(this.selectedSpecialityId);
            this.loadProceduresForSpeciality(this.selectedSpecialityId);
            this.selectedTestId = 0;
            this.selectedProcedures = null;
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOption = 2;
            this.selectedRoomId = parseInt(event.target.value);
            this.selectedTestId = parseInt(event.target.selectedOptions[0].getAttribute('data-testId'));
            this.loadLocationRoomVisits();
            this.fetchRoomSchedule();
            this.loadProceduresForRoomTest(this.selectedTestId);
            this.isProcedureCode = true;
            this.selectedSpeciality = null;
            this.selectedProcedures = null;
        } else {
            this.selectedMode = 0;
            this.selectLocation();
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
        this.addNewPatientForm.reset();
        this.patientScheduleForm.reset();
    }

    closePatientVisitDialog() {
        this.visitDialogVisible = false;
        this.handleVisitDialogHide();
        this.patientVisitForm.reset();
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
        if (!this.selectedLocationId) {
            canScheduleAppointement = false;
            this._notificationsService.alert('Oh No!', 'Please Select Location!');
        } else {
            if (!this.selectedOption) {
                canScheduleAppointement = false;
                this._notificationsService.alert('Oh No!', 'Please Select Speciality Or Medical Test!');
            } else if (this.selectedOption == 1) {
                if (!this.selectedDoctorId) {
                    canScheduleAppointement = false;
                    this._notificationsService.alert('Oh No!', 'Please Select Doctor!');
                } else {
                    if (this.doctorSchedule) {
                        let scheduleDetails: ScheduleDetail[] = this.doctorSchedule.scheduleDetails;
                        let matchingScheduleDetail: ScheduleDetail = _.find(scheduleDetails, (currentScheduleDetail: ScheduleDetail) => {
                            return currentScheduleDetail.isInAllowedSlot(event.date, considerTime);
                        });
                        if (!matchingScheduleDetail) {
                            canScheduleAppointement = false;
                            this._notificationsService.alert('Oh No!', 'You cannot schedule an appointment on this day!');
                        }
                    }
                }
            } else if (this.selectedOption == 2) {
                if (!this.selectedRoomId) {
                    canScheduleAppointement = false;
                    this._notificationsService.alert('Oh No!', 'Please select Room!');
                } else {
                    if (this.roomSchedule) {
                        let scheduleDetails: ScheduleDetail[] = this.roomSchedule.scheduleDetails;
                        let matchingScheduleDetail: ScheduleDetail = _.find(scheduleDetails, (currentScheduleDetail: ScheduleDetail) => {
                            return currentScheduleDetail.isInAllowedSlot(event.date, considerTime);
                        });
                        if (!matchingScheduleDetail) {
                            canScheduleAppointement = false;
                            this._notificationsService.alert('Oh No!', 'You cannot schedule an appointment on this day!');
                        }
                    }
                }
            }
        }

        return canScheduleAppointement;
    }

    handleDayClick(event) {
        let canScheduleAppointement: boolean = this._validateAppointmentCreation(event);

        if (canScheduleAppointement) {

            // Potential Refactoring for creating visit
            let selectedDoctor: Doctor = null;
            let selectedRoom: Room = null;
            if (this.selectedOption === 1) {
                _.each(this.doctorLocationSchedules, (currentSchedule: {
                    doctorLocationSchedule: DoctorLocationSchedule,
                    speciality: DoctorSpeciality
                }) => {
                    if (currentSchedule.doctorLocationSchedule.doctor.id == this.selectedDoctorId) {
                        selectedDoctor = currentSchedule.doctorLocationSchedule.doctor;
                    }
                });
            } else {
                _.each(this.rooms, (currentRoom: Room) => {
                    if (currentRoom.id == this.selectedRoomId) {
                        selectedRoom = currentRoom;
                    }
                });
            }

            this.selectedVisit = new PatientVisit({
                locationId: this.selectedLocationId,
                doctorId: this.selectedOption == 1 ? this.selectedDoctorId : null,
                doctor: selectedDoctor,
                roomId: this.selectedOption == 2 ? this.selectedRoomId : null,
                room: selectedRoom,
                calendarEvent: new ScheduledEvent({
                    name: '',
                    eventStart: event.date.clone().local(),
                    eventEnd: event.date.clone().local().add(30, 'minutes'),
                    timezone: '',
                    isAllDay: false
                })
            });
            this.visitInfo = this.selectedVisit.visitDisplayString;
            this.eventDialogVisible = true;
            this._cd.detectChanges();
        }
    }

    private _getVisitToBeEditedForEventInstance(eventInstance: ScheduledEventInstance): PatientVisit {
        let scheduledEventForInstance: ScheduledEvent = eventInstance.owningEvent;
        let patientVisit: PatientVisit = <PatientVisit>(eventInstance.eventWrapper);
        if (eventInstance.isInPast) {
            if (scheduledEventForInstance.isChangedInstanceOfSeries) {
                // Edit Existing Single Occurance of Visit
                patientVisit = new PatientVisit(_.extend(patientVisit.toJS(), {
                    calendarEvent: scheduledEventForInstance,
                    case: patientVisit.case ? new Case(_.extend(patientVisit.case.toJS())) : null,
                    doctor: patientVisit.doctor ? new Doctor(_.extend(patientVisit.doctor.toJS(), {
                        user: new User(_.extend(patientVisit.doctor.user.toJS()))
                    })) : null,
                    room: patientVisit.room ? new Room(_.extend(patientVisit.room.toJS())) : null,
                    patient: patientVisit.patient ? new Patient(_.extend(patientVisit.patient.toJS(), {
                        user: new User(_.extend(patientVisit.patient.user.toJS()))
                    })) : null
                }));
            } else {
                // Create Visit Instance 
                if (patientVisit.isExistingVisit) {
                    patientVisit = new PatientVisit(_.extend(patientVisit.toJS(), {
                        eventStart: moment.utc(eventInstance.start),
                        eventEnd: moment.utc(eventInstance.end),
                        calendarEvent: scheduledEventForInstance,
                        case: patientVisit.case ? new Case(_.extend(patientVisit.case.toJS())) : null,
                        doctor: patientVisit.doctor ? new Doctor(_.extend(patientVisit.doctor.toJS(), {
                            user: new User(_.extend(patientVisit.doctor.user.toJS()))
                        })) : null,
                        room: patientVisit.room ? new Room(_.extend(patientVisit.room.toJS())) : null,
                        patient: patientVisit.patient ? new Patient(_.extend(patientVisit.patient.toJS(), {
                            user: new User(_.extend(patientVisit.patient.user.toJS()))
                        })) : null
                    }));
                } else {
                    patientVisit = new PatientVisit(_.extend(patientVisit.toJS(), {
                        id: 0,
                        eventStart: moment.utc(eventInstance.start),
                        eventEnd: moment.utc(eventInstance.end),
                        calendarEvent: scheduledEventForInstance,
                        case: patientVisit.case ? new Case(_.extend(patientVisit.case.toJS())) : null,
                        doctor: patientVisit.doctor ? new Doctor(_.extend(patientVisit.doctor.toJS(), {
                            user: new User(_.extend(patientVisit.doctor.user.toJS()))
                        })) : null,
                        room: patientVisit.room ? new Room(_.extend(patientVisit.room.toJS())) : null,
                        patient: patientVisit.patient ? new Patient(_.extend(patientVisit.patient.toJS(), {
                            user: new User(_.extend(patientVisit.patient.user.toJS()))
                        })) : null
                    }));
                }
            }

        } else {
            patientVisit = new PatientVisit(_.extend(patientVisit.toJS(), {
                calendarEvent: scheduledEventForInstance,
                case: patientVisit.case ? new Case(_.extend(patientVisit.case.toJS())) : null,
                doctor: patientVisit.doctor ? new Doctor(_.extend(patientVisit.doctor.toJS(), {
                    user: new User(_.extend(patientVisit.doctor.user.toJS()))
                })) : null,
                room: patientVisit.room ? new Room(_.extend(patientVisit.room.toJS())) : null,
                patient: patientVisit.patient ? new Patient(_.extend(patientVisit.patient.toJS(), {
                    user: new User(_.extend(patientVisit.patient.user.toJS()))
                })) : null
            }));
        }

        return patientVisit;
    }

    handleEventClick(event) {
        let clickedEventInstance: ScheduledEventInstance = event.calEvent;
        let scheduledEventForInstance: ScheduledEvent = clickedEventInstance.owningEvent;
        let patientVisit: PatientVisit = <PatientVisit>(clickedEventInstance.eventWrapper);
        this.selectedCalEvent = clickedEventInstance;

        this.selectedVisit = this._getVisitToBeEditedForEventInstance(clickedEventInstance);
        Object.keys(this.patientScheduleForm.controls).forEach(key => {
            this.patientScheduleForm.controls[key].setValidators(null);
            this.patientScheduleForm.controls[key].updateValueAndValidity();
        });
        this.visitInfo = this.selectedVisit.visitDisplayString;
        if (clickedEventInstance.isInPast) {
            this.visitUploadDocumentUrl = this._url + '/fileupload/multiupload/' + this.selectedVisit.id + '/visit';
            this.getDocuments();
            this.visitDialogVisible = true;
        } else {
            if (scheduledEventForInstance.isSeriesOrInstanceOfSeries) {
                this.confirmEditingEventOccurance();
            } else {
                this.eventDialogVisible = true;
            }
        }
    }

    private _createVisitInstanceForASeries(seriesEvent: ScheduledEvent, instanceStart: moment.Moment, instanceEnd: moment.Moment): PatientVisit {
        return new PatientVisit({
            locationId: this.selectedLocationId,
            doctorId: this.selectedOption == 1 ? this.selectedDoctorId : null,
            roomId: this.selectedOption == 2 ? this.selectedRoomId : null,
            calendarEvent: new ScheduledEvent(_.extend(seriesEvent.toJS(), {
                id: seriesEvent.isChangedInstanceOfSeries ? seriesEvent.id : 0,
                eventStart: instanceStart,
                eventEnd: instanceEnd,
                recurrenceId: seriesEvent.id,
                recurrenceRule: null,
                recurrenceException: []
            }))
        });
    }

    confirmEditingEventOccurance() {
        this._confirmationService.confirm({
            message: 'Do you want to edit/cancel only this event occurrence or the whole series?',
            accept: () => {
                if (this.selectedVisit.calendarEvent.isSeries) {
                    this.selectedVisit = this._createVisitInstanceForASeries(this.selectedVisit.calendarEvent, this.selectedCalEvent.start, this.selectedCalEvent.end);
                }
                this.eventDialogVisible = true;
            },
            reject: () => {
                if (this.selectedVisit.calendarEvent.isChangedInstanceOfSeries) {
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
    saveDiagnosisCodesForVisit(inputDiagnosisCodes: DiagnosisCode[]) {
        let patientVisitFormValues = this.patientVisitForm.value;
        let updatedVisit: PatientVisit;
        let diagnosisCodes = [];
        inputDiagnosisCodes.forEach(currentDiagnosisCode => {
            diagnosisCodes.push({ 'diagnosisCodeId': currentDiagnosisCode.id });
        });

        updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            patientVisitDiagnosisCodes: diagnosisCodes
        }));
        let result = this._patientVisitsStore.updatePatientVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Diagnosis codes saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.loadVisits();
                this._notificationsStore.addNotification(notification);
            },
            (error) => {
                let errString = 'Unable to save diagnosis codes!';
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
    saveProcedureCodesForVisit(inputProcedureCodes: Procedure[]) {
        let patientVisitFormValues = this.patientVisitForm.value;
        let updatedVisit: PatientVisit;
        let procedureCodes = [];
        inputProcedureCodes.forEach(currentProcedureCode => {
            procedureCodes.push({ 'procedureCodeId': currentProcedureCode.id });
        });

        updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            patientVisitProcedureCodes: procedureCodes
        }));
        let result = this._patientVisitsStore.updatePatientVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Procedure codes saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.loadVisits();
                this._notificationsStore.addNotification(notification);
            },
            (error) => {
                let errString = 'Unable to save procedure codes!';
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
    // saveReferral(inputProcedureCodes: Procedure[]) {
    saveReferral(inputVisitReferrals: VisitReferral[]) {
        let result;
        let patientVisitFormValues = this.patientVisitForm.value;
        result = this._visitReferralStore.saveVisitReferral(inputVisitReferrals);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Referral saved successfully.',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.loadVisits();
                this._notificationsStore.addNotification(notification);
            },
            (error) => {
                let errString = 'Unable to save Referral.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error(ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this._progressBarService.hide();
            });
        this.visitDialogVisible = false;
    }

    cancelCurrentOccurrence() {
        if (this.selectedVisit.calendarEvent.isSeries) {
            this.selectedVisit = this._createVisitInstanceForASeries(this.selectedVisit.calendarEvent, this.selectedCalEvent.start, this.selectedCalEvent.end);
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

    cancelSeries() {
        if (this.selectedVisit.calendarEvent.isChangedInstanceOfSeries) {
            let eventId = this.selectedVisit.calendarEvent.recurrenceId;
            this.selectedVisit = this._patientVisitsStore.findPatientVisitByCalendarEventId(eventId);
        }
        let result: Observable<PatientVisit>;
        if (this.selectedVisit.calendarEvent.isSeriesStartedInPast) {
            // terminating series on selected date, if series is already started
            let updatedvisit: PatientVisit = this._getUpdatedVisitWithSeriesTerminatedOn(this.selectedVisit, this.selectedCalEvent.start.utc());
            result = this._patientVisitsStore.updateCalendarEvent(updatedvisit);
        } else {
            // cancelling entire series which is not yet started
            result = this._patientVisitsStore.cancelCalendarEvent(this.selectedVisit);
        }
        this._progressBarService.show();
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

    saveEvent() {
        let patientScheduleFormValues = this.patientScheduleForm.value;
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
            patientId: leaveEvent ? null : patientScheduleFormValues.patientId,
            specialtyId: this.selectedOption == 1 ? this.selectedSpecialityId : null,
            calendarEvent: updatedEvent ? updatedEvent : this.selectedVisit.calendarEvent,
            isOutOfOffice: this.isGoingOutOffice,
            leaveStartDate: leaveEvent ? leaveEvent.eventStart : null,
            leaveEndDate: leaveEvent ? leaveEvent.eventEnd : null,
            transportProviderId: updatedEvent ? updatedEvent.transportProviderId : 0,
            patientVisitProcedureCodes: this.selectedProcedures ? procedureCodes : []
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
                // Add New Visit
                // Change the recurrence rule of selected event to start with selected date from the form 
                // but end on same date as selected Visit rule.
                // new series should start from selected/clicked date
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
            }
        });
        this.getDocuments();
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
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
            this._notificationsService.error('Oh No!', 'select record to delete');
        }
    }

    addNewPatient() {
        if (!this.isAddNewPatient) {
            Object.keys(this.addNewPatientFormControls).forEach(key => {
                this.addNewPatientFormControls[key].setValidators(null);
                this.addNewPatientFormControls[key].updateValueAndValidity();
            });
        } else {
            Object.keys(this.addNewPatientFormControls).forEach(key => {
                this.addNewPatientFormControls[key].setValidators(this.patientFormControlModel()[key][1]);
                this.addNewPatientFormControls[key].updateValueAndValidity();
            });
        }
    }

    cancelAddingNewPatient() {
        this.isAddNewPatient = false;
        this.addNewPatientForm.reset();
    }

    saveNewPatient() {
        this.isSaveProgress = true;
        let addNewPatientFormValues = this.addNewPatientForm.value;
        let result;
        let patient: any = {
            firstName: addNewPatientFormValues.firstName,
            lastName: addNewPatientFormValues.lastName,
            username: addNewPatientFormValues.email,
            cellPhone: addNewPatientFormValues.cellPhone
        };
        this._progressBarService.show();
        result = this._patientsStore.addQuickPatient(patient);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Patient added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this.isAddNewPatient = false;
                this._patientsStore.getPatientsWithOpenCases();
            },
            (error) => {
                let errString = 'Unable to add patient.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }
}
