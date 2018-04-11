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

import { DignosisComponent } from '../dignosis/dignosis.component';
import { ProcedureComponent } from '../procedure/procedure.component';
import { ReferralsComponent } from '../referrals/referrals.component';

@Component({
    selector: 'app-visit-detail',
    templateUrl: './visit-detail.component.html',
    styleUrls: ['./visit-detail.component.scss']
})
export class VisitDetailComponent implements OnInit {
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
    visitDetailForm: FormGroup;
    visitDetailFormControls;
    visitInfo = 'Visit Info';
    //   selectedVisit: PatientVisit;
    visitUploadDocumentUrl: string;
    documents: VisitDocument[] = [];
    selectedDocumentList = [];
    disableSaveDelete = false;
    visitId: number;
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;

    private _url = `${environment.SERVICE_BASE_URL}`;

    @Input() selectedVisit: PatientVisit;
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
        this.visitDetailForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: [''],
            readingDoctor: ['']
        });
        this.visitDetailFormControls = this.visitDetailForm.controls;
    }

    ngOnInit() {
        this.readingDoctor = this.selectedVisit.doctorId != null ? this.selectedVisit.doctorId : 0;
        this.getReadingDoctorsByCompanyId();
        // this.visitUploadDocumentUrl = this._url + '/fileupload/multiupload/' + this.selectedVisit.id + '/visit';
        this.visitUploadDocumentUrl = this._url + '/documentmanager/uploadtoblob';
        this.getDocuments();

        this.checkVisitForCompany();
    }

    checkVisitForCompany() {
        if (this.selectedVisit.originalResponse.location.company.id == this.sessionStore.session.currentCompany.id) {
            this.disableSaveDelete = false;
        } else {
            this.disableSaveDelete = true;
        }
    }
    handleVisitDialogHide() {
        this.selectedVisit = null;
    }

    closePatientVisitDialog() {
        // this.dialogVisible = false;
        this.visitDetailForm.reset();
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
    getReadingDoctorsByCompanyId() {
        // this._progressBarService.show();
        this._doctorsStore.getReadingDoctorsByCompanyId()
            .subscribe((readingDoctors: Doctor[]) => {
                let doctorDetails = _.reject(readingDoctors, (currentDoctor: Doctor) => {
                    return currentDoctor.user == null;
                })
                this.readingDoctors = doctorDetails;
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
                    'type': 'ERROR',
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
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }


    saveVisit() {
        let visitDetailFormValues = this.visitDetailForm.value;
        let updatedVisit: PatientVisit;
        updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            notes: visitDetailFormValues.notes,
            visitStatusId: parseInt(visitDetailFormValues.visitStatusId),
            doctorId: parseInt(visitDetailFormValues.readingDoctor)
        }));
        this._progressBarService.show();
        let result = this._patientVisitStore.updatePatientVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Event updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
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

    saveDiagnosisCodesForVisit(inputDiagnosisCodes: DiagnosisCode[]) {
        let visitDetailFormValues = this.visitDetailForm.value;
        let updatedVisit: PatientVisit;
        let diagnosisCodes = [];
        inputDiagnosisCodes.forEach(currentDiagnosisCode => {
            diagnosisCodes.push({ 'diagnosisCodeId': currentDiagnosisCode.id });
        });

        updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            patientVisitDiagnosisCodes: diagnosisCodes
        }));
        this._progressBarService.show();
        let result = this._patientVisitStore.updatePatientVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Diagnosis codes saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
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
        this.closePatientVisitDialog();
    }

    saveProcedureCodesForVisit(inputProcedureCodes: Procedure[]) {
        let visitDetailFormValues = this.visitDetailForm.value;
        let updatedVisit: PatientVisit;
        let procedureCodes = [];
        inputProcedureCodes.forEach(currentProcedureCode => {
            procedureCodes.push({ 'procedureCodeId': currentProcedureCode.id });
        });

        updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            patientVisitProcedureCodes: procedureCodes
        }));
        this._progressBarService.show();
        let result = this._patientVisitStore.updatePatientVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Procedure codes saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
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
        this.closePatientVisitDialog();
    }

    saveReferral(inputVisitReferrals: VisitReferral[]) {
        let result;
        let visitDetailFormValues = this.visitDetailForm.value;
        result = this._visitReferralStore.saveVisitReferral(inputVisitReferrals);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Referral saved successfully.',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
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
            },
            () => {
                this._progressBarService.hide();
            });
        // this.closePatientVisitDialog();
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

}
