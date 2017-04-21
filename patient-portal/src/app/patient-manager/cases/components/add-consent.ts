import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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

    constructor(
        private fb: FormBuilder,
        private service: ConsentService,
        private _router: Router,
        private _sessionStore: SessionStore,
        public _route: ActivatedRoute,
        private _AddConsentStore: ConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private http: Http,
        private _scannerService: ScannerService,
        private _casesStore: CasesStore,

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
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        this._AddConsentStore.getCompany(this.caseId)
            .subscribe((company) => {
                this.companies = company,
                    this.selectedCompany = this.companies[0].id,
                    this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.caseId + '/' + this.selectedCompany;
            });
        this.loadConsentForm();
    }

    selectcompany(event) {
        // this.selectedcompany = 0;
        this.currentCompany = event.target.value;
        this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.caseId + '/' + this.selectedCompany;

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
        });
        this.loadConsentForm();
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }

    DownloadPdf(documentId) {
        this._progressBarService.show();
        this.DownloadConsent(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);
        this._progressBarService.hide();
    }

    DownloadTemplate() {
        this._progressBarService.show();
        this.DownloadConsent(this._url + '/CompanyCaseConsentApproval/download/' + this.caseId + '/' + this.selectedCompany);
        this._progressBarService.hide();
    }

    DownloadConsent(url) {
        this._progressBarService.show();
        this.http
            .get(url)
            .map(res => {
                // If request fails,
                if (res.status < 200 || res.status >= 500 || res.status == 404) {
                    throw new Error('This request has failed ' + res.status);
                }
                // If everything went fine,
                else {
                    window.location.assign(url);
                }
            })
            .subscribe((data: any) => {
                window.location.assign(url);
                // this.data = data 
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to download ,' + error.statusText,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);

                let errString = 'Unable to download';
                this._progressBarService.hide();
                this._notificationsService.error('Oh No!', 'Unable to download , ' + error.statusText);
            },
            () => {
                this._progressBarService.hide();
            });
        this._progressBarService.hide();
    }
}
