import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ElementRef, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { Message } from 'primeng/primeng'
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
//import { FileUpload, FileUploadModule } from 'primeng/primeng';
import { ConsentStore } from '../stores/consent-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { ConsentService } from '../services/consent-service';
import { Consent } from '../models/consent';
import { Http } from '@angular/http';
import * as _ from 'underscore';
import { ScannerService } from '../../../commons/services/scanner-service';
import { DialogModule } from 'primeng/primeng';
import { ConsentAdapter } from '../services/adapters/consent-adapter';
import { CaseDocument } from '../models/case-document';
import { CasesStore } from '../../cases/stores/case-store';
import { Document } from '../../../commons/models/document';
import { Case } from '../models/case';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
@Component({
    selector: 'add-consent',
    templateUrl: './add-consent.html',
    providers: [ConsentService]
})

export class AddConsentComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    display: boolean = false;
    msgs: Message[];
    uploadedFiles: any[] = [];
    uploadedFile = "";
    currentId: number;
    UploadedFileName: string;
    //document: VisitDocument;
    url;
    doctors: any[];
    isdoctorsLoading = false;
    isSaveProgress = false;
    states: any[];
    consentDetail: Consent;
    consentForm: FormGroup;
    consentformControls;

    minDate: Date;
    maxDate: Date;
    patientId: number;
    caseId: number;
    doctroId: number;
    selectedDoctor = 0;
    isPassChangeInProgress;
    companyId: number;
    fileName: string;
    fileUploaded: string;
    document: Consent[] = [];
    dialogVisible: boolean = false;
    currentCaseId: number;
    documents: CaseDocument[] = [];
    Consent: Consent[];
    caseConsentDocuments: CaseDocument[];
    datasource: Consent[];
    totalRecords: number;
    isDeleteProgress: boolean = false;
    selectedConsentList: CaseDocument[] = [];
    caseDetail: Case;
    @Input() inputCaseId: number;
    caseStatusId: number;

    constructor(
        private fb: FormBuilder,
        private service: ConsentService,
        private _router: Router,
        public sessionStore: SessionStore,
        public _route: ActivatedRoute,
        private _AddConsentStore: ConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private http: Http,
        private _scannerService: ScannerService,
        private _casesStore: CasesStore,
        private confirmationService: ConfirmationService,


    ) {
        this.consentForm = this.fb.group({
            // doctor: ['', Validators.required]
            // ,uploadedFiles: ['', Validators.required]
        });
        this.consentformControls = this.consentForm.controls;
    }

    ngOnInit() {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            if (routeParams.caseId) {
                this.caseId = parseInt(routeParams.caseId, 10);
            } else {
                this.caseId = this.inputCaseId;
            }
            // let companyId: number = this.sessionStore.session.currentCompany.id;
            this.companyId = this.sessionStore.session.currentCompany.id;
            this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.caseId + '/' + this.companyId;

        })

        this.dialogVisible = true;
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        if (!this.inputCaseId) {
            this.loadConsentForm();
            this.getOpenClosed();
        }
    }

    getOpenClosed() {
        this._progressBarService.show();
        let result = this._casesStore.fetchCaseById(this.caseId);
        result.subscribe(
            (caseDetail: Case) => {
                this.caseDetail = caseDetail;
                this.caseStatusId = caseDetail.caseStatusId;
            },
            (error) => {
                this._router.navigate(['../'], { relativeTo: this._route });
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });

    }

    loadConsentForm() {

        this._progressBarService.show();
        this._casesStore.getDocumentForCaseId(this.caseId)
            .subscribe((caseDocument: Case) => {
                this.caseConsentDocuments = _.filter(caseDocument.caseCompanyConsentDocument, (currentCaseCompanyConsentDocument: CaseDocument) => {
                    return currentCaseCompanyConsentDocument.document.originalResponse.companyId === this.companyId;
                });

                // _.forEach(caseDocument.caseCompanyConsentDocument, (currentCaseCompanyConsentDocument: CaseDocument) => {
                //     if (currentCaseCompanyConsentDocument.document.originalResponse.companyId === this.companyId) {
                //         this.caseConsentDocuments = caseDocument.caseCompanyConsentDocument;
                //         this.caseConsentDocuments.push(currentCaseCompanyConsentDocument);
                //     }
                // });

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
                this._notificationsService.error('Oh No!', 'Company, Case and Consent data already exists');
            }
            else {
                let notification = new Notification({
                    'title': 'Consent Uploaded Successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            }
            this.loadConsentForm();
        });
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }


    deleteConsentForm() {
        if (this.selectedConsentList.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedConsentList.forEach(currentCaseDocument => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        let result = this._AddConsentStore.deleteConsent(currentCaseDocument, this.companyId)
                        // let result = this._casesStore.deleteDocument(currentCaseDocument)
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'record deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()

                                });
                                this.loadConsentForm();
                                this._notificationsStore.addNotification(notification);
                                this.selectedConsentList = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete record';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedConsentList = [];
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this.isDeleteProgress = false;
                                this._progressBarService.hide();
                            });
                    });
                }
            });
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

    downloadPdf(documentId) {
        this._progressBarService.show();
        this._AddConsentStore.downloadConsentForm(this.caseId, documentId)
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
    downloadTemplate() {
        this._progressBarService.show();
        this._AddConsentStore.downloadTemplate(this.caseId, this.companyId)
            .subscribe(
            (response) => {
                // this.document = document
                //  window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);
            },
            (error) => {
                let errString = 'Unable to download';
                let notification = new Notification({
                    'messages': 'Unable to download',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                //this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
                this._notificationsService.error('Oh No!', 'Unable to download');

            },
            () => {
                this._progressBarService.hide();
            });
        this._progressBarService.hide();
    }

}


