import { Session } from '../../../commons/models/session';
import { ImeVisit } from '../models/ime-visit';
import { User } from '../../../commons/models/user';
import { Case } from '../../cases/models/case';
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
import { Patient } from '../../patients/models/patient';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { PatientsStore } from '../../patients/stores/patients-store';
import { PatientVisitsStore } from '../stores/patient-visit-store';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Document } from '../../../commons/models/document';
import { VisitDocument } from '../../patient-visit/models/visit-document';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as RRule from 'rrule';
// import { AncillaryMasterStore } from '../../../account-setup/stores/ancillary-store';
// import { AncillaryMaster } from '../../../account-setup/models/ancillary-master';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { CasesStore } from '../../../patient-manager/cases/stores/case-store';

@Component({
    selector: 'ime-visit',
    templateUrl: './ime-visit.html'
})

export class ImeVisitComponent implements OnInit {

    patients: Patient[] = [];
    eventDialogVisible: boolean = false;
    visitDialogVisible: boolean = false;
    addImeVisitDialogVisible: boolean = false;
    imeScheduleForm: FormGroup;
    imeScheduleFormControls;
    imeVisitForm: FormGroup;
    imeVisitFormControls;
    visitUploadDocumentUrl: string;
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    documents: VisitDocument[] = [];
    selectedDocumentList = [];
    isDeleteProgress: boolean = false;
    visitInfo: string = 'Appointment For Investigate Medical Expert';
    visitId: number;
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;
    doctorId: number = this.sessionStore.session.user.id;
    companyId: number;
    patientId: number;
    isSaveProgress: boolean = false;
    ancillaryProviderId: number = null;
    // allPrefferesAncillaries: AncillaryMaster[];
    referredBy: string = '';
    isAllDay: boolean;
    repeatType: string = '7';
    name: string = 'Appointment for IME ';
    @Output() closeDialogBox: EventEmitter<any> = new EventEmitter();
    @Output() refreshEvents: EventEmitter<any> = new EventEmitter();
    cases: Case[];
    private _selectedEvent: ScheduledEvent;
    eventStartAsDate: Date;
    eventEndAsDate: Date;
    duration: number;
    transportProviderId = null;
    caseId;
    notes;
    selectedVisit;
    
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
        { time: '6:30 AM', id: '12' },
        { time: '7:00 AM', id: '13' },
        { time: '7:30 AM', id: '14' },
        { time: '8:00 AM', id: '15' },
        { time: '8:30 AM', id: '16' },
        { time: '9:00 AM', id: '17' },
        { time: '9:30 AM', id: '18' },
        { time: '10:00 AM', id: '19' },
        { time: '10:30 AM', id: '20' },
        { time: '11:00 AM', id: '21' },
        { time: '11:30 AM', id: '22' },
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
        { time: '6:30 PM', id: '12' },
        { time: '7:00 PM', id: '13' },
        { time: '7:30 PM', id: '14' },
        { time: '8:00 PM', id: '15' },
        { time: '8:30 PM', id: '16' },
        { time: '9:00 PM', id: '17' },
        { time: '9:30 PM', id: '18' },
        { time: '10:00 PM', id: '19' },
        { time: '10:30 PM', id: '20' },
        { time: '11:00 PM', id: '21' },
        { time: '11:30 PM', id: '22' },
    ];

    @Input() set selectedEvent(value: ScheduledEvent) {
        if (value) {
            this._selectedEvent = value;
            this.name = this._selectedEvent.name;
            this.eventStartAsDate = this._selectedEvent.eventStartAsDate;
            this.duration = moment.duration(this._selectedEvent.eventEnd.diff(this._selectedEvent.eventStart)).asMinutes();
            this.eventEndAsDate = this._selectedEvent.eventEndAsDate;
            this.isAllDay = this._selectedEvent.isAllDay;
            
            var startTimeString = this._selectedEvent.eventStartAsDate.toLocaleTimeString();
            let startTimeArray = startTimeString.split(':');
            this.setTimeSlot = startTimeArray[0] + ':' + startTimeArray[1] + ' ' + startTimeArray[2].slice(3);

            var endTimeString = this._selectedEvent.eventEndAsDate.toLocaleTimeString();
            let endTimeArray = endTimeString.split(':');
            this.setEndTimeSlot = endTimeArray[0] + ':' + endTimeArray[1] + ' ' + endTimeArray[2].slice(3);
        }
    }

    constructor(
        public _route: ActivatedRoute,
        private _fb: FormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        public sessionStore: SessionStore,
        private _patientVisitsStore: PatientVisitsStore,
        private _patientsStore: PatientsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsStore: NotificationsStore,
        private _confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        // private _ancillaryMasterStore: AncillaryMasterStore,
        private _casesStore: CasesStore,
    ) {
        this.imeScheduleForm = this._fb.group({
            patientId: ['', Validators.required],
            caseId: ['', Validators.required],
            notes: [''],
            name: ['', Validators.required],
            doctorName: ['', Validators.required],
            eventStartDate: ['', Validators.required],
            eventStartTime: [''],
            eventEndDate: ['', Validators.required],
            eventEndTime: [''],
            // duration: ['', Validators.required],
            // transportProviderId: [''],
        });
        // this.loadPrefferdAncillaries();

        this.imeScheduleFormControls = this.imeScheduleForm.controls;

        this.imeVisitForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: [''],
            readingDoctor: ['']
        });

        this.imeVisitFormControls = this.imeVisitForm.controls;
    }

    // loadPrefferdAncillaries() {
    //     // this._progressBarService.show();
    //     this._ancillaryMasterStore.getAncillaryMasters()
    //         .subscribe((allPrefferesAncillaries: AncillaryMaster[]) => {
    //             this.allPrefferesAncillaries = allPrefferesAncillaries;
    //         },
    //         (error) => {
    //             // this._progressBarService.hide();
    //         },
    //         () => {
    //             // this._progressBarService.hide();
    //         });
    // }

    ngOnInit() {
        // this.loadImeVisits();
        // this.header = {
        //     left: 'prev,next today',
        //     center: 'title',
        //     right: 'month,agendaWeek,agendaDay,listWeek,listDay'
        // };
        // this.views = {
        //     listDay: { buttonText: 'list day' },
        //     listWeek: { buttonText: 'list week' }
        // };

        // this._patientsStore.getOpenCasesByCompanyWithPatient()
        //     .subscribe(
        //     (patient: Patient[]) => {
        //         this.patients = patient;
        //     },
        //     (error) => {
        //         this._router.navigate(['../'], { relativeTo: this._route });
        //         this._progressBarService.hide();
        //     },
        //     () => {
        //         this._progressBarService.hide();
        //     });
        this._patientsStore.getPatientsWithOpenCases()
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

    selectPatient(event) {
        let currentPatient: number = parseInt(event.target.value);
        if (event.value != '') {
            let result = this._casesStore.getOpenCaseForPatientByPatientIdAndCompanyId(currentPatient);
            result.subscribe((cases) => { this.cases = cases; }, null);
        }
    }

    saveEvent() {
        this.isSaveProgress = true;
        let imeScheduleFormValues = this.imeScheduleForm.value;
        let result;
        let startDate = moment(this.eventStartAsDate).format('YYYY-MM-DD');
        let startDateTime = new Date(startDate + ' ' + imeScheduleFormValues.eventStartTime) ;
        let endDate = moment(this.eventEndAsDate).format('YYYY-MM-DD');
        let endDateTime = new Date(startDate + ' ' + imeScheduleFormValues.eventEndTime) ;
        let ime = new ImeVisit({
            patientId: this.imeScheduleForm.value.patientId,
            caseId: this.imeScheduleForm.value.caseId,
            notes: this.imeScheduleForm.value.notes,
            doctorName: this.imeScheduleForm.value.doctorName,
            createByUserID: this.sessionStore.session.account.user.id,
            VisitCreatedByCompanyId: this.sessionStore.session.currentCompany.id,
            calendarEvent: new ScheduledEvent({
                eventStart: moment(startDateTime),
                eventEnd: moment(endDateTime),
                // eventStart: moment(this.eventStartAsDate),
                // eventEnd: moment(this.eventStartAsDate).add(this.duration, 'minutes'),
                timezone: this.eventStartAsDate.getTimezoneOffset(),
                // eventStartDate: this.imeScheduleForm.value.eventStartDate,
                // duration: this.imeScheduleForm.value.duration,
                // ancillaryProviderId: this.imeScheduleForm.value.ancillaryProviderId,
            })
        });

        // this._progressBarService.show();

        result = this._patientVisitsStore.addImeVisit(ime);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Event added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this.closeDialog();
                this.refreshImeEvents();
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

    refreshImeEvents() {
        this.refreshEvents.emit();
    }
    handleVisitDialogHide() { }

}
