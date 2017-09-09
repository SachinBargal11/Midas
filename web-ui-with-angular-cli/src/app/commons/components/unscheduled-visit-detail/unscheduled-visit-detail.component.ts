import { UnscheduledVisit } from '../../../patient-manager/patient-visit/models/unscheduled-visit';

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as moment from 'moment';
import * as _ from 'underscore';
import { PatientVisitsStore } from '../../../patient-manager/patient-visit/stores/patient-visit-store';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { NotificationsStore } from '../../stores/notifications-store';
import { Notification } from '../../models/notification';
import { PatientsStore } from '../../../patient-manager/patients/stores/patients-store';
import { Patient } from '../../../patient-manager/patients/models/patient';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Room } from '../../../medical-provider/rooms/models/room';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { ProgressBarService } from '../../services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../utils/ErrorMessageFormatter';
import { CasesStore } from '../../../patient-manager/cases/stores/case-store';
import { Case } from '../../../patient-manager/cases/models/case';
import { environment } from '../../../../environments/environment';
import { Document } from '../../models/document';
import { VisitDocument } from '../../../patient-manager/patient-visit/models/visit-document';
import { SessionStore } from '../../stores/session-store';
import { DiagnosisCode } from '../../models/diagnosis-code';
import { Procedure } from '../../models/procedure';
import { VisitReferral } from '../../../patient-manager/patient-visit/models/visit-referral';
import { VisitReferralStore } from '../../../patient-manager/patient-visit/stores/visit-referral-store';

@Component({
    selector: 'unscheduled-visit-detail',
    templateUrl: './unscheduled-visit-detail.component.html',
    styleUrls: ['./unscheduled-visit-detail.component.scss']
})

export class UnscheduledVisitDetailComponent implements OnInit {
    selectedVisits: PatientVisit[] = [];
    selectedDoctorsVisits: PatientVisit[] = [];
    selectedRoomsVisits: PatientVisit[] = [];
    visits: PatientVisit[];
    caseId: number;
    patientId: number;
    datasource: PatientVisit[];
    totalRecords: number;
    currentDoctorName: string;
    currentRoomName: string;
    doctorsVisits: PatientVisit[];
    roomsVisits: PatientVisit[];
    doctor: Doctor;
    room: Room;
    patientName: string;
    patient: Patient;
    isDeleteProgress = false;
    caseStatusId: number;

    readingDoctors: Doctor[];
    readingDoctor: number;
    unscheduledVisitDetailForm: FormGroup;
    unscheduledVisitDetailFormControls;
    visitInfo: string;
    //   selectedVisit: PatientVisit;
    visitUploadDocumentUrl: string;
    documents: VisitDocument[] = [];
    selectedDocumentList = [];
    disableSaveDelete = false;
    visitId: number;
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;

    private _url = `${environment.SERVICE_BASE_URL}`;

    @Input() selectedVisit: UnscheduledVisit;
    @Input() routeFrom: number;
    //   @Input() selectedVisitId: number;
    @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
    // @Output() saveComplete: EventEmitter<PatientVisit> = new EventEmitter();
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _patientStore: PatientsStore,
        private _notificationsService: NotificationsService,
        private _doctorsStore: DoctorsStore,
        private _roomsStore: RoomsStore,
        private confirmationService: ConfirmationService,
        private _casesStore: CasesStore,
        private _visitReferralStore: VisitReferralStore,
        public sessionStore: SessionStore
    ) {
        this.unscheduledVisitDetailForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: [''],
            readingDoctor: ['']
        });
        this.unscheduledVisitDetailFormControls = this.unscheduledVisitDetailForm.controls;
    }

    ngOnInit() {
        this.fetchPatient();
        this.selectedVisit = this.selectedVisit;
        // this.visitUploadDocumentUrl = this._url + '/fileupload/multiupload/' + this.selectedVisit.id + '/visit';
        this.visitUploadDocumentUrl = this._url + '/documentmanager/uploadtoblob';
        this.getDocuments();

        // this.checkVisitForCompany();
    }

    fetchPatient() {
        this._route.parent.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            let result;
            if (this.patientId) {
                result = this._patientStore.fetchPatientById(this.patientId);
            } else {
                result = this._patientStore.fetchPatientById(this.selectedVisit.patientId);
                this.patientId = this.selectedVisit.patientId;
            }
            result.subscribe(
                (patient: Patient) => {
                    this.patient = patient;
                    this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
                    // this.visitInfo = `${this.visitInfo}Patient Name: ${this.patient.user.displayName} - Case Id: ${this.caseId}`;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        })
    }

    // checkVisitForCompany() {
    //     if (this.selectedVisit.originalResponse.location.company.id == this.sessionStore.session.currentCompany.id) {
    //         this.disableSaveDelete = false;
    //     } else {
    //         this.disableSaveDelete = true;
    //     }
    // }
    handleVisitDialogHide() {
        this.selectedVisit = null;
    }

    closePatientVisitDialog() {
        // this.dialogVisible = false;
        this.unscheduledVisitDetailForm.reset();
        this.handleVisitDialogHide();
        this.closeDialog.emit();
    }

    getDocuments() {
        // this._progressBarService.show();
        this._patientVisitStore.getDocumentsForVisitId(this.selectedVisit.id)
            .subscribe(document => {
                this.documents = document;
            },

            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }

    downloadPdf(documentId) {
        this._progressBarService.show();
        this._patientVisitStore.downloadDocumentForm(this.visitId, documentId)
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

    showDialog(currentCaseId: number) {
        this.addConsentDialogVisible = true;
        this.selectedCaseId = currentCaseId;
    }

    documentUploadComplete(documents: Document[]) {
        _.forEach(documents, (currentDocument: Document) => {
            if (currentDocument.status === 'Failed') {
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

    saveVisit() {
        let unscheduledVisitDetailFormValues = this.unscheduledVisitDetailForm.value;
        let updatedVisit: UnscheduledVisit;
        updatedVisit = new UnscheduledVisit(_.extend(this.selectedVisit.toJS(), {
            notes: unscheduledVisitDetailFormValues.notes,
            visitStatusId: parseInt(unscheduledVisitDetailFormValues.visitStatusId),
            // doctorId: parseInt(unscheduledVisitDetailFormValues.readingDoctor)
        }));
        this._progressBarService.show();
        let result = this._patientVisitStore.updateUnscheduledVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Event updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Event updated successfully');
                // this.uploadComplete.emit(documents);
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
        this.closePatientVisitDialog();
    }

    isCreatedByCompany(companyId): boolean {
        let isCreatedByCompany: boolean = false;
        if (this.selectedVisit.orignatorCompanyId === companyId) {
            isCreatedByCompany = true;
        }
        return isCreatedByCompany;
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
                this._patientVisitStore.deleteDocument(currentCase)
                    .subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Record deleted successfully!',
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
                'title': 'Select record to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select record to delete');
        }
    }
}