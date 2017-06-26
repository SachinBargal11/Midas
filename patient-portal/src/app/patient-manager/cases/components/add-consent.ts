import { FormBuilder, FormGroup, Validator, Validators, } from '@angular/forms';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { Message } from 'primeng/primeng'
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ConsentStore } from '../stores/consent-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { ConsentService } from '../services/consent-service';
import { Consent } from '../models/consent';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore';
import { ScannerService } from '../../../commons/services/scanner-service';
import { DialogModule } from 'primeng/primeng';
import { ConsentAdapter } from '../services/adapters/consent-adapter';
import { CaseDocument } from '../models/case-document';
import { CasesStore } from '../../cases/stores/case-store';
import { Document } from '../../../commons/models/document';
import { Case } from '../models/case';
import { LazyLoadEvent } from 'primeng/primeng';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    url;
    companies: any[];
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
    selectedcompany = 0;
    isPassChangeInProgress;
    companyId: number;
    fileName: string;
    fileUploaded: string;
    document: Consent[] = [];
    currentCaseId: number;
    documents: CaseDocument[] = [];
    currentCompany: number;
    selectedCompany: number;
    selectedConsentList: Consent[] = [];
    Consent: Consent[];
    Case: Case;
    datasource: Consent[];
    totalRecords: number;
    signedDocumentPostRequestData: any = {};
    signedDocumentUploadUrl: string = '';
    changeCompneyConsenturl: SafeResourceUrl;
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _sessionStore: SessionStore,
        public _route: ActivatedRoute,
        private _consentStore: ConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private http: Http,
        private _scannerService: ScannerService,
        private _casesStore: CasesStore,
        private _sanitizer: DomSanitizer,
        private _consentService: ConsentService,
        public notificationsStore: NotificationsStore,

    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            // this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.caseId + '/' + this.currentCompany;
            this.consentForm = this.fb.group({
                company: ['', Validators.required]
                // ,uploadedFiles: ['', Validators.required]
            });
            this.consentformControls = this.consentForm.controls;
        })
    }


    ngOnInit() {
        this._consentStore.getCompany(this.caseId)
            .subscribe((company) => {
                this.companies = company,
                    this.selectedCompany = this.companies[0].id,
                    this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.caseId + '/' + this.selectedCompany;

                this.signedDocumentUploadUrl = `${this._url}/CompanyCaseConsentApproval/uploadsignedconsent`;
                this.signedDocumentPostRequestData = {
                    companyId: this.selectedCompany,
                    caseId: this.caseId
                };
            });
        this.loadConsentForm();
    }

    selectcompany(event) {
        // this.selectedcompany = 0;
        this.currentCompany = parseInt(event.target.value);
        this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.caseId + '/' + this.selectedCompany;
        this.signedDocumentUploadUrl = `${this._url}/CompanyCaseConsentApproval/uploadsignedconsent`;
        this.signedDocumentPostRequestData = {
            companyId: this.currentCompany,
            caseId: this.caseId
        };
        this.changeCompneyConsenturl = this._sanitizer.bypassSecurityTrustResourceUrl(this._consentService.getConsentFormDownloadUrl(this.caseId, this.currentCompany, false));

        //this.documentUploadComponent.ngOnInit();
        // this.documentUploadComponent.cosentFormUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._consentService.getConsentFormDownloadUrl(this.caseId, this.currentCompany, false));

    }

    loadConsentForm() {
        this._progressBarService.show();
        this._casesStore.getDocumentForCaseId(this.caseId)
            .subscribe((caseDocument: Case) => {
                this.documents = caseDocument.caseCompanyConsentDocument;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadConsentFormLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.Consent = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }
    showDialog() {
        this.addConsentDialogVisible = true;
        this.caseId = this.caseId;
        // this.companyId = providerCompanyId;
        this.companyId = this._sessionStore.session.currentCompany.id;
    }

    documentUploadComplete(documents: Document[]) {
        _.forEach(documents, (currentDocument: Document) => {
            if (currentDocument.status == 'Failed') {
                let notification = new Notification({
                    'title': currentDocument.message + '  ' + currentDocument.documentName,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', currentDocument.message);
            } else if (currentDocument.status == 'Success') {
                let notification = new Notification({
                    'title': 'Consent uploaded successfully',
                    'type': 'SUCCESS',
                    'createdAt': moment(),

                });
                this.notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Consent uploaded successfully');
                this.loadConsentForm();
        
            }
        });
    }

    signedDocumentUploadComplete(document: Document) {
        if (document.status == 'Failed') {
            let notification = new Notification({
                'title': document.message + '  ' + document.documentName,
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Company, Case and Consent data already exists.');
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
    }

    signedDocumentUploadError(error: Error) {
        let errString = 'Not able to signed document.';
        let notification = new Notification({
            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
            'type': 'ERROR',
            'createdAt': moment()
        });
        this._notificationsStore.addNotification(notification);
        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }

    downloadPdf(documentId) {
        this._progressBarService.show();
        this._consentStore.downloadConsentForm(this.caseId, documentId)
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

    downloadTemplate(event) {
        this._progressBarService.show();
        this._consentStore.downloadTemplate(this.caseId, this.selectedCompany)
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
