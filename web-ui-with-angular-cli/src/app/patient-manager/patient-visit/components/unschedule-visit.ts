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
import { AncillaryMasterStore } from '../../../account-setup/stores/ancillary-store';
import { AncillaryMaster } from '../../../account-setup/models/ancillary-master';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { CasesStore } from '../../../patient-manager/cases/stores/case-store';

@Component({
    selector: 'unschedule-visit',
    templateUrl: './unschedule-visit.html'
})

export class UnscheduleVisitComponent implements OnInit {

    patients: Patient[] = [];
    eventDialogVisible: boolean = false;
    visitDialogVisible: boolean = false;
    unscheduleForm: FormGroup;
    unscheduleFormControls;
    unscheduleVisitForm: FormGroup;
    unscheduleVisitFormControls;
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
    referredBy: string = '';
    isAllDay: boolean;
    repeatType: string = '7';
    @Output() closeDialogBox: EventEmitter<any> = new EventEmitter();
    cases: Case[];
    private _selectedEvent: ScheduledEvent;
    eventStartAsDate: Date;
    eventEndAsDate: Date;
    duration: number;

    @Input() set selectedEvent(value: ScheduledEvent) {
        if (value) {
            this._selectedEvent = value;
            this.eventStartAsDate = this._selectedEvent.eventStartAsDate;
            this.duration = moment.duration(this._selectedEvent.eventEnd.diff(this._selectedEvent.eventStart)).asMinutes();
            this.eventEndAsDate = this._selectedEvent.eventEndAsDate;
            this.isAllDay = this._selectedEvent.isAllDay;
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
        private _ancillaryMasterStore: AncillaryMasterStore,
        private _casesStore: CasesStore,
    ) {
        this.unscheduleForm = this._fb.group({
            patientId: ['', Validators.required],
            caseId: ['', Validators.required],
            notes: [''],
            medicalProviderName: ['', Validators.required],
            doctorName: ['', Validators.required],
            eventStartDate: [''],
            eventStartTime: [''],
            duration: ['', Validators.required],
        });

        this.unscheduleFormControls = this.unscheduleForm.controls;

        this.unscheduleVisitForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: [''],
            readingDoctor: ['']
        });

        this.unscheduleVisitFormControls = this.unscheduleVisitForm.controls;
    }

    ngOnInit() {
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
        let unscheduleFormValues = this.unscheduleForm.value;
        let result;
        let ime = new ImeVisit({
            patientId: this.unscheduleForm.value.patientId,
            caseId: this.unscheduleForm.value.caseId,
            medicalProviderName: this.unscheduleForm.value.medicalProviderName,
            doctorName: this.unscheduleForm.value.doctorName,
            notes: this.unscheduleForm.value.notes,
            createByUserID: this.sessionStore.session.account.user.id,
            calendarEvent: new ScheduledEvent({
                eventStart: moment(this.eventStartAsDate),
                eventEnd: moment(this.eventStartAsDate).add(this.duration, 'minutes'),
                timezone: this.eventStartAsDate.getTimezoneOffset(),
                // eventStartDate: this.unscheduleForm.value.eventStartDate,
                // duration: this.unscheduleForm.value.duration,
                // ancillaryProviderId: this.unscheduleForm.value.ancillaryProviderId,
            })
        });

        this._progressBarService.show();

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

    closeDialog() {
        this.closeDialogBox.emit();
    }

}
