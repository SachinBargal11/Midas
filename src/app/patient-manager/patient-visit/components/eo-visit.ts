import { InsuranceMaster } from '../../patients/models/insurance-master';
import { InsuranceMasterStore } from '../../../account-setup/stores/insurance-master-store';
import { UsersStore } from '../../../medical-provider/users/stores/users-store';
// import { Procedure } from '../../../commons/models/procedure';
// import { DiagnosisCode } from '../../../commons/models/diagnosis-code';
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
// import { ScheduleDetail } from '../../../medical-provider/locations/models/schedule-detail';
// import { Schedule } from '../../../medical-provider/rooms/models/rooms-schedule';
// import { Room } from '../../../medical-provider/rooms/models/room';
import { Patient } from '../../patients/models/patient';
import { PatientVisit } from '../models/patient-visit';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { PatientsStore } from '../../patients/stores/patients-store';
// import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
// import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
// import { ScheduleStore } from '../../../medical-provider/locations/stores/schedule-store';
// import { RoomScheduleStore } from '../../../medical-provider/rooms/stores/rooms-schedule-store';
// import { DoctorLocationScheduleStore } from '../../../medical-provider/users/stores/doctor-location-schedule-store';
import { PatientVisitsStore } from '../stores/patient-visit-store';
// import { RoomsService } from '../../../medical-provider/rooms/services/rooms-service';
// import { Tests } from '../../../medical-provider/rooms/models/tests';
// import { Speciality } from '../../../account-setup/models/speciality';
// import { ScheduledEventEditorComponent } from '../../../medical-provider/calendar/components/scheduled-event-editor';
// import { LeaveEventEditorComponent } from '../../../medical-provider/calendar/components/leave-event-editor';
// import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
// import { SpecialityService } from '../../../account-setup/services/speciality-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Document } from '../../../commons/models/document';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
// import { LeaveEvent } from '../../../commons/models/leave-event';
import { VisitDocument } from '../../patient-visit/models/visit-document';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as RRule from 'rrule';
// import { ProcedureStore } from '../../../commons/stores/procedure-store';
// import { VisitReferralStore } from '../stores/visit-referral-store';
// import { VisitReferral } from '../models/visit-referral';
// import { AncillaryMasterStore } from '../../../account-setup/stores/ancillary-store';
// import { AncillaryMaster } from '../../../account-setup/models/ancillary-master';
import { EoVisit } from '../models/eo-visit';

@Component({
    selector: 'eo-visit',
    templateUrl: './eo-visit.html'
})


export class EoVisitComponent implements OnInit {

    // @ViewChild(ScheduledEventEditorComponent)
    // private _scheduledEventEditorComponent: ScheduledEventEditorComponent;

    // @ViewChild(LeaveEventEditorComponent)
    // private _leaveEventEditorComponent: LeaveEventEditorComponent;

    // @ViewChild('cd')
    // private _confirmationDialog: any;

    /* Data Lists */
    patients: Patient[] = [];
    // rooms: Room[] = [];
    doctorLocationSchedules: {
        doctorLocationSchedule: DoctorLocationSchedule,
        speciality: DoctorSpeciality
    }[] = [];
    // roomSchedule: Schedule;
    // doctorSchedule: Schedule;

    /* Selections */
    // selectedVisit: PatientVisit;
    // selectedCalEvent: ScheduledEventInstance;
    // selectedLocationId: number = 0;
    // selectedDoctorId: number = 0;
    // selectedRoomId: number = 0;
    // selectedOption: number = 0;
    // selectedTestId: number = 0;
    // selectedMode: number = 0;
    // selectedSpecialityId: number = 0;
    // outOfOfficeVisits: any;

    /* Dialog Visibilities */
    eventDialogVisible: boolean = false;
    visitDialogVisible: boolean = false;

    /* Form Controls */
    private scheduledEventEditorValid: boolean = false;
    private leaveEventEditorValid: boolean = false;
    isFormValidBoolean: boolean = false;
    eoScheduleForm: FormGroup;
    eoScheduleFormControls;
    addNewPatientForm: FormGroup;
    addNewPatientFormControls;
    eoVisitForm: FormGroup;
    eoVisitFormControls;
    addEoVisitDialogVisible: boolean = false;

    /* Calendar Component Configurations */
    // events: ScheduledEventInstance[];
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

    visitInfo: string = 'Appointment For Examination Under Oath';
    isAddNewPatient: boolean = false;
    isGoingOutOffice: boolean = false;
    isProcedureCode: boolean = false;
    // procedures: Procedure[];
    // selectedProcedures: Procedure[];
    // selectedSpeciality: Speciality;
    // readingDoctors: Doctor[];
    // readingDoctor = 0;
    visitId: number;
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;
    doctorId: number = this.sessionStore.session.user.id;
    doctors: Doctor[];
    userId: number;
    user: string;
    userName: string;
    insuranceMasters: InsuranceMaster[];
    insuranceProviderId;
    notes = '';
    selectedVisit:EoVisit;

    // eventRenderer: Function = (event, element) => {
    //     // if (event.owningEvent.isUpdatedInstanceOfRecurringSeries) {
    //     //     element.find('.fc-content').prepend('<i class="fa fa-exclamation-circle"></i>&nbsp;');
    //     // } else if (event.owningEvent.recurrenceRule) {
    //     //     element.find('.fc-content').prepend('<i class="fa fa-refresh"></i>&nbsp;');
    //     // }
    //     let content: string = '';
    //     if (event.owningEvent.isUpdatedInstanceOfRecurringSeries) {
    //         content = `<i class="fa fa-exclamation-circle"></i>`;
    //     } else if (event.owningEvent.recurrenceRule) {
    //         content = `<i class="fa fa-refresh"></i>`;
    //     }
    //     content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">${event.eventWrapper.patient.user.displayName}</span>`;
    //     // if (event.eventWrapper.isOutOfOffice) {
    //     //     content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">Out of office</span>`;
    //     // } else {
    //     //     if (!event.eventWrapper.isOutOfOffice) {
    //     // content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">${event.eventWrapper.patient.user.displayName}</span>`;
    //     //     }
    //     // }
    //     element.find('.fc-content').html(content);
    // }

    isSaveProgress: boolean = false;
    // ancillaryProviderId: number = null;
    // allPrefferesAncillaries: AncillaryMaster[];
    // referredBy: string = '';
    private _selectedEvent: EoVisit;
    eventStartAsDate: Date;
    eventEndAsDate: Date;
    duration: number;
    isAllDay: boolean;
    repeatType: string = '7';
    name: string = 'Appointment for EUO';
    // @Input() selectedEventDate;
    scheduledEventEditorForm: FormGroup;
    scheduledEventEditorFormControls;
    
    
    setTimeSlot: string = '12:00 AM';
    setEndTimeSlot: string = '12:00 AM';
    timeSlots: any[] = [
        { time: '12:00 AM', id: '1' },
        { time: '12:30 AM', id: '2' },
        { time: '1:00 AM', id: '3' },
        { time: '1:30 AM', id: '4' },
        { time: '2:00 AM', id: '5' },
        { time: '2:30 AM', id: '6' },
        { time: '3:00 AM', id: '7' },
        { time: '3:30 AM', id: '8' },
        { time: '4:00 AM', id: '9' },
        { time: '4:30 AM', id: '10' },
        { time: '5:00 AM', id: '11' },
        { time: '5:30 AM', id: '12' },
        { time: '6:00 AM', id: '13' },
        { time: '6:30 AM', id: '14' },
        { time: '7:00 AM', id: '15' },
        { time: '7:30 AM', id: '16' },
        { time: '8:00 AM', id: '17' },
        { time: '8:30 AM', id: '18' },
        { time: '9:00 AM', id: '19' },
        { time: '9:30 AM', id: '20' },
        { time: '10:00 AM', id: '21' },
        { time: '10:30 AM', id: '22' },
        { time: '11:00 AM', id: '23' },
        { time: '11:30 AM', id: '24' },
        { time: '12:00 PM', id: '1' },
        { time: '12:30 PM', id: '2' },
        { time: '1:00 PM', id: '3' },
        { time: '1:30 PM', id: '4' },
        { time: '2:00 PM', id: '5' },
        { time: '2:30 PM', id: '6' },
        { time: '3:00 PM', id: '7' },
        { time: '3:30 PM', id: '8' },
        { time: '4:00 PM', id: '9' },
        { time: '4:30 PM', id: '10' },
        { time: '5:00 PM', id: '11' },
        { time: '5:30 PM', id: '12' },
        { time: '6:00 PM', id: '13' },
        { time: '6:30 PM', id: '14' },
        { time: '7:00 PM', id: '15' },
        { time: '7:30 PM', id: '16' },
        { time: '8:00 PM', id: '17' },
        { time: '8:30 PM', id: '18' },
        { time: '9:00 PM', id: '19' },
        { time: '9:30 PM', id: '20' },
        { time: '10:00 PM', id: '21' },
        { time: '10:30 PM', id: '22' },
        { time: '11:00 PM', id: '23' },
        { time: '11:30 PM', id: '24' },
    ];

    @Output() isValid = new EventEmitter();
    @Output() closeDialogBox: EventEmitter<any> = new EventEmitter();
    @Output() refreshEvents: EventEmitter<any> = new EventEmitter();
    @Input() set selectedEvent(value: EoVisit) {
        if (value) {
            this.selectedVisit = value;
            this._selectedEvent = value;
            this.name = this._selectedEvent.calendarEvent.name;
            this.eventStartAsDate = this._selectedEvent.calendarEvent.eventStartAsDate;
            // this.duration = moment.duration(this._selectedEvent.eventEnd.diff(this._selectedEvent.eventStart)).asMinutes();
            this.eventEndAsDate = this._selectedEvent.calendarEvent.eventEndAsDate;
            this.isAllDay = this._selectedEvent.calendarEvent.isAllDay;

            var startTimeString = this._selectedEvent.calendarEvent.eventStartAsDate.toLocaleTimeString();
            let startTimeArray = startTimeString.split(':');
            this.setTimeSlot = startTimeArray[0]+':'+startTimeArray[1]+' '+startTimeArray[2].slice(3);

            var endTimeString = this._selectedEvent.calendarEvent.eventEndAsDate.toLocaleTimeString();
            let endTimeArray = endTimeString.split(':');
            this.setEndTimeSlot = endTimeArray[0]+':'+endTimeArray[1]+' '+endTimeArray[2].slice(3);

            // this.userName = this._selectedEvent.visitDisplayString();
            this.doctorId = this._selectedEvent.doctorId;
            this.insuranceProviderId = this._selectedEvent.insuranceProviderId;
            this.notes = this._selectedEvent.notes;

        } else {
            this._selectedEvent = null;
            this.eventStartAsDate = null;
            this.eventEndAsDate = null;
            this.isAllDay = false;
        }
    }

    get selectedEvent(): EoVisit {
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
        // private _roomsStore: RoomsStore,
        private _doctorsStore: DoctorsStore,
        // public locationsStore: LocationsStore,
        // private _scheduleStore: ScheduleStore,
        // private _roomScheduleStore: RoomScheduleStore,
        // private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
        private _progressBarService: ProgressBarService,
        private _notificationsStore: NotificationsStore,
        private _confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        // private _roomsService: RoomsService,
        // private _specialityService: SpecialityService,
        // private _procedureStore: ProcedureStore,
        // private _visitReferralStore: VisitReferralStore,
        // private confirmationService: ConfirmationService,
        // private _ancillaryMasterStore: AncillaryMasterStore,
        private _usersStore: UsersStore,
        private _insuranceMasterStore: InsuranceMasterStore,
    ) {
        this.eoScheduleForm = this._fb.group({
            doctorId: ['', Validators.required],
            notes: [''],
            insuranceProviderId: ['',Validators.required],
            name: ['', Validators.required],
            eventStartDate: ['', Validators.required],
            eventStartTime: [''],
            eventEndDate: ['', Validators.required],
            eventEndTime: [''],
            // duration: ['', Validators.required],
        });
        // this.loadPrefferdAncillaries();
        this.eoScheduleFormControls = this.eoScheduleForm.controls;

        this.eoVisitForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: [''],
            readingDoctor: ['']
        });
        this.eoVisitFormControls = this.eoVisitForm.controls;
    }

    ngOnInit() {
        // this.eventStartAsDate = this.selectedEventDate;
        // this.loadVisits();
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek,listDay'
        };
        this.views = {
            listDay: { buttonText: 'list day' },
            listWeek: { buttonText: 'list week' }
        };

        this._doctorsStore.getDoctorsByCompanyId()
            .subscribe(
            (doctor: Doctor[]) => {
                this.doctors = doctor;
            },
            (error) => {
                this._router.navigate(['../'], { relativeTo: this._route });
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });

        this.userId = this.sessionStore.session.user.id;
        this._usersStore.fetchUserById(this.userId)
            .subscribe(
            (userDetail: any) => {
                this.user = userDetail;
                this.userName = userDetail.firstName + ' ' + userDetail.lastName;
            },
            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });

        this._insuranceMasterStore.getAllInsuranceMasters()
            .subscribe(insuranceMasters => {
                this.insuranceMasters = insuranceMasters.reverse();
            },
            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }


    saveEvent() {
        this.isSaveProgress = true;
        let eoScheduleFormValues = this.eoScheduleForm.value;
        let result;
        let startDate = moment(this.eventStartAsDate).format('YYYY-MM-DD');
        let startDateTime = new Date(startDate + ' ' + eoScheduleFormValues.eventStartTime) ;
        let endDate = moment(this.eventEndAsDate).format('YYYY-MM-DD');
        let endDateTime = new Date(startDate + ' ' + eoScheduleFormValues.eventEndTime) ;
        let eo = new EoVisit({
            doctorId: this.eoScheduleForm.value.doctorId,
            caseId: null,
            insuranceProviderId: this.eoScheduleForm.value.insuranceProviderId,
            VisitCreatedByCompanyId: this.sessionStore.session.currentCompany.id,
            notes: this.eoScheduleForm.value.notes,
            createByUserID: this.sessionStore.session.account.user.id,
            calendarEvent: new ScheduledEvent({
                // eventStart: moment(this.eventStartAsDate),
                // eventEnd: moment(this.eventEndAsDate).add(this.duration, 'minutes'),
                // eventEnd: moment(this.eventEndAsDate),
                eventStart: moment(startDateTime),
                eventEnd: moment(endDateTime),
                timezone: this.eventStartAsDate.getTimezoneOffset(),
            })
        });

        // this._progressBarService.show();
        result = this._patientVisitsStore.addEoVisit(eo);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Event added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this.closeDialog();
                this.refreshEuoEvents();
            },
            (error) => {
                let errString = 'Unable to add event!';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                // this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
            },
            () => {
                // this._progressBarService.hide();
            });
    }

    closeDialog() {
        this.closeDialogBox.emit();
    }
    refreshEuoEvents() {
        this.refreshEvents.emit();
    }
    handleVisitDialogHide() {

    }

    getDocuments() {
        // this._progressBarService.show();
        // this._patientVisitsStore.getDocumentsForVisitId(this.selectedVisit.id)
        //     .subscribe(document => {
        //         this.documents = document;
        //     },

        //     (error) => {
        //         this._progressBarService.hide();
        //     },
        //     () => {
        //         this._progressBarService.hide();
        //     });
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

     cancelAppointment() {
        let result;
        result = this._patientVisitsStore.deleteEuoVisit(this.selectedVisit);

        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Appointment cancelled successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.eventDialogVisible = false;
                this.closeDialog()
                this.refreshEuoEvents();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Appointment cancelled successfully!');
            },
            (error) => {
                let errString = 'Unable to cancel appointment!';
                let notification = new Notification({
                    // 'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
                // this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this._progressBarService.hide();
            });
    }
}