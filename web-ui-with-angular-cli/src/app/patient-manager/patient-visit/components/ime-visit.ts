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
    allPrefferesAncillaries: AncillaryMaster[];
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
    // @Input() selectedEventDate;

    @Input() set selectedEvent(value: ScheduledEvent) {
        if (value) {
            this._selectedEvent = value;
            this.name = this._selectedEvent.name;
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
            transportProviderId: [''],
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
        // this.eventStartAsDate = this.selectedEventDate;
        // this.eventEndAsDate = this.selectedEventDate;
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
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
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
        let ime = new ImeVisit({
            patientId: this.imeScheduleForm.value.patientId,
            caseId: this.imeScheduleForm.value.caseId,
            notes: this.imeScheduleForm.value.notes,
            transportProviderId: this.imeScheduleForm.value.transportProviderId,
            doctorName: this.imeScheduleForm.value.doctorName,
            createByUserID: this.sessionStore.session.account.user.id,
            VisitCreatedByCompanyId: this.sessionStore.session.currentCompany.id,
            calendarEvent: new ScheduledEvent({
                eventStart: moment(this.eventStartAsDate),
                // eventEnd: moment(this.eventStartAsDate).add(this.duration, 'minutes'),
                eventEnd: moment(this.eventEndAsDate),
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
                // this.closeDialog();
                // this.refreshImeEvents();
                // this._progressBarService.hide();
            });
    }

    closeDialog() {
        this.closeDialogBox.emit();
    }
    refreshImeEvents() {
        this.refreshEvents.emit();
    }

    // getDocuments() {
    // this._progressBarService.show();
    // // this._patientVisitsStore.getDocumentsForVisitId(this.selectedVisit.id)
    //     .subscribe(document => {
    //         this.documents = document;
    //     },

    //     (error) => {
    //         this._progressBarService.hide();
    //     },
    //     () => {
    //         this._progressBarService.hide();
    //     });
    // }

    // documentUploadComplete(documents: Document[]) {
    //     _.forEach(documents, (currentDocument: Document) => {
    //         if (currentDocument.status == 'Failed') {
    //             let notification = new Notification({
    //                 'title': currentDocument.message + '  ' + currentDocument.documentName,
    //                 'type': 'ERROR',
    //                 'createdAt': moment()
    //             });
    //             this._notificationsStore.addNotification(notification);
    //             this._notificationsService.error('Oh No!', currentDocument.message);
    //         } else if (currentDocument.status == 'Success') {
    //             let notification = new Notification({
    //                 'title': 'Document uploaded successfully',
    //                 'type': 'SUCCESS',
    //                 'createdAt': moment()
    //             });
    //             this._notificationsStore.addNotification(notification);
    //             this._notificationsService.success('Success!', 'Document uploaded successfully');
    //             this.addConsentDialogVisible = false;
    //         }
    //     });
    //     this.getDocuments();
    // }

    // documentUploadError(error: Error) {
    //     if (error.message == 'Please select document Type') {
    //         this._notificationsService.error('Oh No!', 'Please select document Type');
    //     }
    //     else {
    //         this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    //     }
    // }

    // showDialog(currentCaseId: number) {
    //     this.addConsentDialogVisible = true;
    //     this.selectedCaseId = currentCaseId;
    // }

    // downloadPdf(documentId) {
    //     this._progressBarService.show();
    //     this._patientVisitsStore.downloadDocumentForm(this.visitId, documentId)
    //         .subscribe(
    //         (response) => {
    //             // this.document = document
    //             // window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);
    //         },
    //         (error) => {
    //             let errString = 'Unable to download';
    //             let notification = new Notification({
    //                 'messages': 'Unable to download',
    //                 'type': 'ERROR',
    //                 'createdAt': moment()
    //             });
    //             this._progressBarService.hide();
    //             //  this._notificationsStore.addNotification(notification);
    //             this._notificationsService.error('Oh No!', 'Unable to download');
    //         },
    //         () => {
    //             this._progressBarService.hide();
    //         });
    //     this._progressBarService.hide();
    // }

    // deleteDocument() {
    //     if (this.selectedDocumentList.length > 0) {
    //         // this.confirmationService.confirm({
    //         //     message: 'Do you want to delete this record?',
    //         //     header: 'Delete Confirmation',
    //         //     icon: 'fa fa-trash',
    //         //     accept: () => {

    //         this.selectedDocumentList.forEach(currentCase => {
    //             this._progressBarService.show();
    //             this.isDeleteProgress = true;
    //             this._patientVisitsStore.deleteDocument(currentCase)
    //                 .subscribe(
    //                 (response) => {
    //                     let notification = new Notification({
    //                         'title': 'record deleted successfully!',
    //                         'type': 'SUCCESS',
    //                         'createdAt': moment()

    //                     });
    //                     this.getDocuments();
    //                     this._notificationsStore.addNotification(notification);
    //                     this.selectedDocumentList = [];
    //                 },
    //                 (error) => {
    //                     let errString = 'Unable to delete record';
    //                     let notification = new Notification({
    //                         'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
    //                         'type': 'ERROR',
    //                         'createdAt': moment()
    //                     });
    //                     this.selectedDocumentList = [];
    //                     this._progressBarService.hide();
    //                     this.isDeleteProgress = false;
    //                     this._notificationsStore.addNotification(notification);
    //                     this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
    //                 },
    //                 () => {
    //                     this._progressBarService.hide();
    //                     this.isDeleteProgress = false;
    //                 });
    //         });
    //     } else {
    //         let notification = new Notification({
    //             'title': 'select record to delete',
    //             'type': 'ERROR',
    //             'createdAt': moment()
    //         });
    //         this._notificationsStore.addNotification(notification);
    //         this._notificationsService.error('Oh No!', 'Select record to delete');
    //     }
    // }
}
